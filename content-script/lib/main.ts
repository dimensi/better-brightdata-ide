import "./user-worker";
import $ from "jquery";
import { wait } from "./helpers";
import "./custom-styles.css";
import { key } from "./common";
import { SettingsFromPage } from "./types/settings";
import { createEditor, prepareEditor } from "./editor-helpers";

async function start() {
  console.log("Better IDE: start initialize");
  injectBridge();

  await wait(".cr_editor_body");
  const data = await waitData();
  console.log(data);
  prepareEditor(data);
  const editorContainers = collectEditors();
  const sides = ["top", "bottom"] as Array<
    keyof ReturnType<typeof collectEditors>
  >;
  const initEditor = (
    id: keyof typeof editorContainers,
    containers: ReturnType<typeof collectEditors>
  ) => {
    const wrapper = containers[id];
    hideMirror(wrapper);
    const container = createContainer(wrapper, id);
    const value = getInitialValue(wrapper);
    return createEditor(id, container, value);
  };
  const editors = sides.map((id) => initEditor(id, editorContainers));

  window.addEventListener(
    "message",
    (event) => {
      // We only accept messages from ourselves
      if (event.source != window) {
        return;
      }
      if (
        event.data?.type === key &&
        event.data?.payload?.type === "changeStep"
      ) {
        const editorContainers = collectEditors();
        editors.forEach((editor, id) => {
          editor.dispose();
          editors[id] = initEditor(sides[id], editorContainers);
        });
      }
    },
    false
  );
}

function injectBridge() {
  const bridge = document.createElement("script");
  bridge.src = chrome.runtime.getURL("bridge-script.iife.js");
  bridge.onload = () => {
    bridge.remove();
  };
  (document.head || document.documentElement).appendChild(bridge);
}

function waitData(): Promise<SettingsFromPage> {
  return new Promise((resolve) => {
    const subscribe = (event: MessageEvent) => {
      // We only accept messages from ourselves
      if (event.source != window) {
        return;
      }

      if (event.data?.type === key) {
        resolve(event.data.payload.value);
        window.removeEventListener("message", subscribe, false);
      }
    };

    window.addEventListener("message", subscribe, false);
  });
}

function collectEditors() {
  const [top, bottom] = $(".cr_editor_body .codemirror_wrapper");
  return { top, bottom };
}

function hideMirror(wrapper: HTMLElement) {
  const $wrapper = $(wrapper);
  $wrapper.children(".CodeMirror").hide();
}

function getInitialValue(wrapper: HTMLElement) {
  const $wrapper = $(wrapper);
  return $wrapper.children("textarea").text();
}

function createContainer(wrapper: HTMLElement, id: string) {
  const $wrapper = $(wrapper);
  const $monacoContainer = $(
    `<div id="collectorEditor-${id}" style="height: 700px"></div>`
  );
  $wrapper.append($monacoContainer);
  return $monacoContainer[0];
}

start().catch(console.error);

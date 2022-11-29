(function() {
  "use strict";
  const key = "better-ide";
  const waitTime = (time = 1e3) => new Promise((res) => setTimeout(res, time));
  async function wait(selector, timeout = 30) {
    let counter = 0;
    while (counter < timeout) {
      if (document.querySelector(selector)) {
        return;
      } else {
        counter++;
        await waitTime();
      }
    }
    throw new Error("not exists");
  }
  async function main() {
    console.log("BETTER IDE injected");
    window.addEventListener(
      "message",
      (event) => {
        if (event.data.type === key) {
          const { id, value } = event.data.payload;
          console.log("receive message");
          try {
            const prevEditor = getReactEditor(id);
            const { on_change } = getProps(prevEditor[0]);
            on_change(value);
          } catch (err) {
            console.log("Cannot find props");
          }
        }
      },
      false
    );
    await wait(".cr_editor_body");
    const {
      code_commands,
      parse_commands,
      expected_output_fields,
      input_schema
    } = getProps($(".cr_editor_body").parent()[0]);
    let currentStep = getActiveStep();
    window.postMessage(
      {
        type: key,
        payload: {
          type: "initialSettings",
          value: {
            code_commands,
            parse_commands,
            expected_output_fields,
            input_schema
          }
        }
      },
      "*"
    );
    checkActiveStep();
    function checkActiveStep() {
      const step = getActiveStep();
      if (step !== currentStep) {
        currentStep = step;
        window.postMessage(
          {
            type: key,
            payload: {
              type: "changeStep"
            }
          },
          "*"
        );
      }
      setTimeout(checkActiveStep, 500);
    }
    function getActiveStep() {
      const rootComponent = $(".cp_dca_page")[0];
      const componentInstance = getReactInstance(rootComponent);
      return componentInstance.return.stateNode.state.active_step;
    }
    function getReactInstance(element) {
      const key2 = Object.keys(element).filter((k) => k.includes("Instance")).pop();
      return element[key2];
    }
    function getProps(element) {
      return getReactInstance(element).return.stateNode.props;
    }
    function getReactEditor(id) {
      return getContainerById(id).parent();
    }
    function getContainerById(id) {
      return $(`#collectorEditor-${id}`);
    }
  }
  main().catch(console.error);
})();

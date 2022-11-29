import * as monaco from "monaco-editor";
import { SettingsFromPage } from "./types/settings";
import cherrioApi from "./types/cheerio.d?raw";
import commandsApi from "./types/commands.d?raw";
import prettier from "prettier/standalone";
import parserBabel from "prettier/parser-babel";
import debounce from "lodash.debounce";

function createInputObjectLib(settings: SettingsFromPage) {
  const source = `
    declare var input: {
      ${Object.entries(settings.input_schema.fields)
        .map(
          ([key, field]) =>
            `${key}${field.required ? ":" : "?:"} ${field.type};`
        )
        .join("\n")}
        [key: string]: any;
    }
  `;
  const uri = "ts:filename/input.d.ts";
  return { source, uri };
}

function createOutputObjectLib(settings: SettingsFromPage) {
  const arrFields = Object.entries(settings.expected_output_fields.fields)
    .filter(
      ([key, field]) =>
        !["warning", "error", "input"].includes(key) && field.active
    )
    .map(([key]) => key);
  const source = `
    interface OutputData {
      ${arrFields.map((key) => `${key}: string;`).join("\n")}
    }
    declare function collect(data: OutputData): void;
  `;
  const uri = "ts:filename/output.d.ts";
  return { source, uri };
}

// function createCommandsLib(settings: SettingsFromPage) {
//   const functions = settings.code_commands
//     .filter((command) => !["collect", "$"].includes(command.cmd))
//     .map((command) => {
//       const getTypeOfArg = (arg: Arg) =>
//         arg.description.includes("string") ? "string" : "object";
//
//       const argsJsdoc = command.args
//         .map(
//           (arg) =>
//             ` * @param {${getTypeOfArg(arg)}} ${
//               !arg.optional ? arg.name : `[${arg.name}]`
//             } ${arg.description}`
//         )
//         .join("\n");
//       const createUnion = (arrStr: string[]) =>
//         arrStr.map((s) => `'${s}'`).join(" | ");
//
//       const generateUnionOrObject = (arg: Arg) => {
//         if (getTypeOfArg(arg) === "string") {
//           return arg.options ? createUnion(arg.options) : "string";
//         }
//         if (arg.options) {
//           return `Record<${createUnion(arg.options)}, any>`;
//         }
//         return `Record<string, unknown>`;
//       };
//
//       const args = command.args
//         .map(
//           (arg) =>
//             `${arg.name}${!arg.optional ? ":" : "?:"} ${generateUnionOrObject(
//               arg
//             )}`
//         )
//         .join(", ");
//       return `
// /**
//  * ${command.description}
// ${argsJsdoc || " * "}
// ${
//   command.examples
//     ?.map(
//       (example) => ` * @example:
// \`\`\`
// ${example}
// \`\`\``
//     )
//     .join("\n") ?? " * "
// }
//  */
// declare function ${command.cmd}(${args}): any
//         `;
//     })
//     .join("\n");
//
//   return {
//     source: functions,
//     uri: "ts:filename/commands.d.ts",
//   };
// }

function addDefinitions(source: string, uri: string) {
  monaco.languages.typescript.javascriptDefaults.addExtraLib(source, uri);
  monaco.editor.createModel(source, "typescript", monaco.Uri.parse(uri));
}

export function prepareEditor(settings: SettingsFromPage) {
  const inputObject = createInputObjectLib(settings);
  const outputObject = createOutputObjectLib(settings);
  addDefinitions(inputObject.source, inputObject.uri);
  addDefinitions(outputObject.source, outputObject.uri);
  addDefinitions(commandsApi, "ts:filename/commands.d.ts");
  addDefinitions(cherrioApi, "ts:filename/cheerio.d.ts");

  monaco.languages.typescript.javascriptDefaults.setDiagnosticsOptions({
    noSemanticValidation: false,
    noSyntaxValidation: false,
  });

  monaco.languages.typescript.javascriptDefaults.setCompilerOptions({
    allowNonTsExtensions: true,
    noUnusedLocals: true,
    noUnusedParameters: true,
    strictFunctionTypes: false,

    lib: [
      "es2016",
      "es2017.object",
      "es2017.string",
      "es2018.asyncgenerator",
      "es2018.asynciterable",
      "es2018.promise",
      "es2018.regexp",
      "es2019.array",
      "es2019.object",
      "es2019.string",
      "es2019.symbol",
      "es2020.date",
      "es2020.number",
      "es2020.promise",
      "es2020.string",
      "es2020.symbol",
      "es2021.promise",
      "es2021.string",
      "es2022.array",
      "es2022.object",
      "es2022.string",
    ],
  });
  monaco.languages.registerDocumentFormattingEditProvider("javascript", {
    async provideDocumentFormattingEdits(model) {
      const text = prettier.format(model.getValue(), {
        parser: "babel",
        plugins: [parserBabel],
      });

      return [
        {
          range: model.getFullModelRange(),
          text,
        },
      ];
    },
  });
}

export function createEditor(
  id: string,
  container: HTMLElement,
  defaultValue: string
) {
  const editor = monaco.editor.create(container, {
    value: defaultValue,
    theme: "vs-dark",
    language: "javascript",
    automaticLayout: true,
  });

  const debouncedMessage = debounce(() => {
    window.postMessage(
      {
        type: "better-ide",
        payload: {
          id: id,
          value: editor.getValue(),
        },
      },
      "*"
    );
  }, 500);
  editor.onDidChangeModelContent(debouncedMessage);

  return editor;
}

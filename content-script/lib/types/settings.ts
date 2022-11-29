export interface SettingsFromPage {
  code_commands: CodeCommand[];
  parse_commands: ParseCommand[];
  expected_output_fields: ExpectedOutputFields;
  input_schema: InputSchema;
}

export interface CodeCommand {
  cmd: string;
  args: Arg[];
  summary: string;
  description: string;
  examples?: string[];
  screenshot?: string;
}

export interface Arg {
  name: string;
  description: string;
  options?: string[];
  optional?: boolean;
}

export interface ParseCommand {
  cmd: string;
  description: string;
  examples: string[];
  description_extra?: string;
}

export interface ExpectedOutputFields {
  type: string;
  fields: Record<string, OutputField>;
}

export interface OutputField {
  type: string;
  required?: boolean;
  active: boolean;
  normalize?: any;
  draft_field?: boolean;
  default_value?: string;
  format?: Format;
}

export interface Format {
  preset: string;
}

export interface InputSchema {
  customer: string;
  type: string;
  name: string;
  description: string;
  example: Example[];
  fields: Record<string, InputField>;
  id: string;
  family: string;
  patch: number;
  version: string;
}

export interface InputField {
  type: "string" | "number";
  required: boolean;
}

export interface Example {
  limit: number;
  tag: string;
  since: number;
}

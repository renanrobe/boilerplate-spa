module.exports = (plop) => {
  plop.setGenerator("component", {
    description: "Create a component",
    prompts: [
      {
        type: "input",
        name: "name",
        message: "What is your component name?"
      }
    ],
    actions: [
      {
        type: 'add',
        path: '../src/containers/{{name}}/index.tsx',
        templateFile: 'templates/index.tsx.hbs'
      },
      {
        type: "add",
        path: "../src/containers/{{name}}/list.tsx",
        templateFile: "templates/list.tsx.hbs"
      },
      {
        type: "add",
        path: "../src/containers/{{name}}/register.tsx",
        templateFile: "templates/register.tsx.hbs"
      },
      {
        type: "add",
        path: "../src/services/{{name}}.service.tsx",
        templateFile: "templates/services/serviceGenerated.service.tsx.hbs"
      },
      {
        type: "add",
        path: "../src/models/{{name}}.model.tsx",
        templateFile: "templates/models/modelGenerated.model.tsx.hbs"
      }
    ]
  })
}

export const getSyntaxTheme = (stack = "", title = "") => {
  const s = stack.toLowerCase();
  const name = title.replace(/\s/g, '');

  // Tema para Go
  if (s.includes("go") || s.includes("fiber")) {
    return {
      comment: "// Go High-Performance",
      header: `package main\n\ntype ${name} struct {`,
      footer: "}",
      items: stack.split(',').map(t => `  ${t.trim().replace(/\s/g, '')} string`),
    };
  }

  // Tema para Python
  if (s.includes("python") || s.includes("fastapi") || s.includes("django")) {
    return {
      comment: "# Python Backend",
      header: `class ${name}:`,
      footer: "    pass",
      items: stack.split(',').map(t => `    ${t.trim().toLowerCase()} = "${t.trim()}"`),
    };
  }

  // Tema por defecto (JS/TS/Node)
  return {
    comment: "// Node.js Stack",
    header: `class ${name} {`,
    footer: "}",
    items: [
      `  const stack = [`,
      ...stack.split(',').map(t => `    "${t.trim()}",`),
      `  ];`
    ],
  };
};
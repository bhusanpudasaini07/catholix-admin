export const mainRoleColor = [
  {
    role_name: "Designer",
    color: "#FC8452",
  },
  {
    role_name: "QA",
    color: "#3BA272",
  },
  {
    role_name: "Developer",
    color: "#5470C6",
  },
  {
    role_name: "Devops",
    color: "#91CC75",
  },
  {
    role_name: "Project Management",
    color: "#4A91F7",
  },
];

interface IRoleColorMapping {
  [role: string]: {
    paletteIndex: number;
    shadeIndex: number;
  };
}

// Define color palettes for roles
const colorPalettes = [
  {
    role: "Designer",
    shades: ["#FDA986", "#FC966C", "#FC8452", "#D67046", "#BD633D", "#B15D3A"], // Shades of orange
  },
  {
    role: "Developer",
    shades: [
      "#BBC6E8",
      "#A1B0E0",
      "#879BD7",
      "#6D85CE",
      "#5470C6",
      "#475FA8",
      "#3F5494",
      "#3B4F8B",
      "#324377",
      "#2A3863",
    ], // Shades of blue
  },
  {
    role: "Devops",
    shades: ["#B2DB9E", "#A1D48A", "#91CC75", "#7BAE64", "#6D9958", "#6D9958"], // Shades of l-green
  },
  {
    role: "Project Management",
    shades: ["#80B2F9", "#65A1F8", "#4A91F7", "#3F7BD2", "#376DB9 ", "#3466AD"], // Shades of Blue bright
  },
  {
    role: "QA",
    shades: ["#75BE9C", "#58B087", "#3BA272", "#328A61", "#2C7955", "#297250"], // Shades of green
  },
];

let roleColorMapping: IRoleColorMapping = {};

export const getColorForRole = (role: string) => {
  if (!roleColorMapping[role]) {
    // Assign the next palette to this role
    const paletteIndex = colorPalettes.findIndex((p) => p.role === role);
    if (paletteIndex === -1) {
      return null;
      // throw new Error(`No color palette defined for role: ${role}`);
    }
    roleColorMapping[role] = { paletteIndex, shadeIndex: 0 };
  }

  const { paletteIndex, shadeIndex } = roleColorMapping[role];
  const palette = colorPalettes[paletteIndex];
  const color = palette.shades[shadeIndex % palette.shades.length];
  // Update the shade index for the next item of the same role
  roleColorMapping[role].shadeIndex += 1;

  return color;
};

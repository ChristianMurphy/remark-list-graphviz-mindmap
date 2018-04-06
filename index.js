const visitParents = require("unist-util-visit-parents");
const select = require("unist-util-select");

module.exports = () => tree => {
  console.log("digraph {");

  visitParents(tree, "listItem", (listItem, parents) => {
    const parentListItem = parents
      .reverse()
      .find(({ type }) => type === "listItem");

    // there is no parent to print
    if (!parentListItem) {
      return;
    }

    const parentTextList = select(parentListItem, ":root > paragraph > text");
    const currentTextList = select(listItem, ":root > paragraph > text");

    console.log(
      `"${parentTextList
        .map(({ value }) => value)
        .join(" ")}" -> "${currentTextList
        .map(({ value }) => value)
        .join(" ")}"`
    );
  });

  console.log("}");
};

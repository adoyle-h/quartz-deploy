import rehypeFigure from "@microflash/rehype-figure"
import { Element, Literal, Root as HtmlRoot } from "hast"
import { visit } from "unist-util-visit"
import { QuartzTransformerPlugin } from "../types"

interface Options {
}

const transImageWidth = () => {
  return (tree: HtmlRoot) => {
    visit(tree, "element", (node: Element) => {
      if (node.tagName === "img" && typeof node.properties.src === "string") {
        const alt = node.properties.alt?.toString()
        if (alt.length == 0) return

        const match = alt.match(/\|(\d+)((?:x)(\d+))?$/)
        if (match) {
          node.properties.alt = alt.slice(0, -match[0].length)
          if (match[1]) {
            node.properties.width = match[1]
          }
          if (match[3]) {
            node.properties.height = match[3]
          }
        }
      }
    })
  }
}

export const ImprovedImage: QuartzTransformerPlugin<Options> = (opts?: Options) => {
  return {
    name: "ImprovedImage",
    htmlPlugins() {
      return [transImageWidth, rehypeFigure]
    },
  }
}

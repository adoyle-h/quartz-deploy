import { QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { classNames } from "../util/lang"
import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"


const skipKeys = [
  // https://quartz.jzhao.xyz/plugins/Frontmatter#list
  'title', 'description', 'permalink', 'comments', 'lang', 'publish', 'enableToc', 'cssclasses',
  'socialDescription', 'socialImage', 'created', 'updated', 'modified', 'published', 'banner',
  'robots',
]

export const MetaCard: QuartzComponentConstructor = () => ({
  cfg,
  fileData,
  externalResources,
  ctx,
}: QuartzComponentProps) => {
  const { frontmatter } = fileData
  let value: any, valType: string
  const list = []
  for (let key in frontmatter) {
    value = frontmatter[key]
    if (skipKeys.includes(key)) continue
    valType = typeof value

    if (value == null) {
      value = ''
    } else if (valType == 'string') {
      if (value.startsWith('https://') || value.startsWith('https://')) {
        value = <a href={value} target="_blank">{value}</a>
      }
    } else if (valType == 'object') {
      value = Object.keys(value).map((k) => {
        return <span class="value-item">{value[k]}</span>
      })
    } else if (valType == 'array') {
      value = value.map((v: any) => {
        return <span class="value-item">{v}</span>
      })
    }

    list.push(<tr class="meta"><td class="key">{key}</td> <td class="value">{value}</td></tr>)
  }

  if (list.length == 0) return null

  return <table class="metacard" >
    <tbody>{list}</tbody>
  </table>
}

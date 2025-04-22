import { QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { classNames } from "../util/lang"
import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"


export const Banner: QuartzComponentConstructor = () => ({
  cfg,
  fileData,
  externalResources,
  ctx,
}: QuartzComponentProps) => {
  const banner = fileData.frontmatter?.banner
  if (!banner) return null
  return <div class="banner" >
    <img src={banner} />
  </div>
}

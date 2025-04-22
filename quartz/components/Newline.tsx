import { QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { classNames } from "../util/lang"

function NewlineComp({ displayClass }: QuartzComponentProps) {
  return <div class={classNames(displayClass, "newline")} />
}

export const Newline: QuartzComponentConstructor = () => NewlineComp

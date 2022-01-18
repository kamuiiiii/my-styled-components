import React, { ComponentType } from "react";
import { compile, serialize, stringify } from 'stylis'
import generateComponentId from "./utils/generateComponentId";
import { domElements, DomElements } from "./utils/domElements";

const reconcileStyles = (rawStyles, interpolations, props) => {
  const styles = rawStyles.reduce((acc, cur, idx) => {
    const interpolation = interpolations[idx - 1]
    if (interpolation.name === 'StyledComponent') {
      return acc + `.${interpolation.styledComponentId}` + cur
    } else {
      return acc + interpolation(props) + cur
    }
  })
  return styles
}

let identifier = 0
const comeUpWithUniqueName = () => {
  const name = 'sc' + identifier
  identifier += 1
  return generateComponentId(name)
}

const createAndInjectCSSClass = (styles) => {
  const styleElement = document.createElement('style')
  styleElement.innerHTML = styles
  document.head.appendChild(styleElement)
}

const stylis = (str: string) => serialize(compile(str), stringify)

const runStylesThroughStylis = (uniqueClassName, styles) => {
  return stylis(`.${uniqueClassName} {${styles}}`)
}

const combineClassNames = (className, uniqueClassName) => {
  if (className) {
    return [uniqueClassName, className].join(' ')
  } else {
    return uniqueClassName
  }
}

const styled = (Tag: DomElements | ComponentType<any>) => (rawStyles: Array<string>, ...interpolations: Array<any>) => {
  const uniqueClassName = comeUpWithUniqueName();
  const StyledComponent = (props) => {
    const styles = reconcileStyles(rawStyles, interpolations, props)
    const processedStyles = runStylesThroughStylis(uniqueClassName, styles);
    createAndInjectCSSClass(processedStyles);
    const combinedClasses = combineClassNames(props.className, uniqueClassName)
    return <Tag {...props} className={combinedClasses} />
  }
  StyledComponent.styledComponentId = uniqueClassName
  return StyledComponent
}

type BaseStyled = typeof styled;
type EnhancedStyled = {
  [key in DomElements]: ReturnType<BaseStyled>;
};
const enhancedStyled = styled as BaseStyled & EnhancedStyled

domElements.forEach(domElement => {
  styled[domElement] = styled(domElement)
})

export default enhancedStyled
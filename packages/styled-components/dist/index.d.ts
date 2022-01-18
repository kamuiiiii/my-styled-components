/// <reference types="react" />
import { DomElements } from "./utils/domElements";
declare const styled: (Tag: any) => (rawStyles: any, ...interpolations: any[]) => {
    (props: any): JSX.Element;
    styledComponentId: string;
};
declare type BaseStyled = typeof styled;
declare type EnhancedStyled = {
    [key in DomElements]: ReturnType<BaseStyled>;
};
declare const enhancedStyled: ((Tag: any) => (rawStyles: any, ...interpolations: any[]) => {
    (props: any): JSX.Element;
    styledComponentId: string;
}) & EnhancedStyled;
export default enhancedStyled;

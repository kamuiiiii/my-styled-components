import { ComponentType } from "react";
import { DomElements } from "./utils/domElements";
declare const styled: (Tag: DomElements | ComponentType<any>) => (rawStyles: any, ...interpolations: any[]) => {
    (props: any): JSX.Element;
    styledComponentId: string;
};
declare type BaseStyled = typeof styled;
declare type EnhancedStyled = {
    [key in DomElements]: ReturnType<BaseStyled>;
};
declare const enhancedStyled: ((Tag: DomElements | ComponentType<any>) => (rawStyles: any, ...interpolations: any[]) => {
    (props: any): JSX.Element;
    styledComponentId: string;
}) & EnhancedStyled;
export default enhancedStyled;

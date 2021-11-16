import { Dispatch } from "./utils";

// definitions taken from react and react-redux and badly mangled to allow the code to typecheck
// without importing the whole of react and react-redux for the tests
class Component<P> {
    constructor(props: Readonly<P> | P) {
        props;
    }

    readonly props: Readonly<P>;
}

export type ConnectedComponent<C, P> = Component<P> & {
    WrappedComponent: C;
} & never;
export type GetProps<C> = C extends Component<infer P> ? P : never;

// definitions taken from react-redux
export type DistributiveOmit<T, K extends keyof T> = T extends unknown ? Omit<T, K> : never;
export type Matching<InjectedProps, DecorationTargetProps> = {
    [P in keyof DecorationTargetProps]: P extends keyof InjectedProps
        ? InjectedProps[P] extends DecorationTargetProps[P]
            ? DecorationTargetProps[P]
            : InjectedProps[P]
        : DecorationTargetProps[P];
};

type Connect<StateProps, DispatchProps, C> = (
    component: C
) => ConnectedComponent<C, DistributiveOmit<GetProps<C>, Extract<keyof (StateProps & DispatchProps), keyof GetProps<C>>>>;

// dummy function which loops forever - but it typechecks and allows our tests to compile
// and check the generated code without any compile errors
export function connect<State, StateProps, DispatchProps, C>(
    mapStateToProps: (state: State) => StateProps,
    mapDispatchToProps: (dispatch: Dispatch) => DispatchProps
): Connect<StateProps, DispatchProps, C> {
    return connect(mapStateToProps, mapDispatchToProps);
}

// DO NOT EDIT - AUTOMATICALLY GENERATED!
// This file is generated from test/hiddenState/redux.yml, edit that file instead.

import { ConnectedComponent, DistributiveOmit, GetLibraryManagedProps, GetProps, Matching, Shared, connect } from "../react-redux2";
import { genHiddenStateReducer, hiddenStateIncreaseCountAction } from "./actions";
import { ComponentType } from "../react2";
import { Dispatch } from "../utils";

export interface HiddenStateState {
    count: number;
    hiddenCount: number;
}

const initialState: HiddenStateState = {
    count: 0,
    hiddenCount: 0,
};

export const hiddenStateReducer = genHiddenStateReducer(initialState, {
    increaseCount: (state: HiddenStateState): HiddenStateState => ({
        ...state,
        count: state.hiddenCount > 0 ? state.count + 1 : state.count,
        hiddenCount: state.hiddenCount === 0 ? 1 : 0,
    }),
});

export interface HiddenStateStateProps {
    count: number;
}

export function mapStateToProps(state: HiddenStateState): HiddenStateStateProps {
    return {
        count: state.count,
    };
}

export interface HiddenStateDispatchProps {
    increaseCount(): void;
}

export function mapDispatchToProps(dispatch: Dispatch): HiddenStateDispatchProps {
    return {
        increaseCount: (): void => dispatch(hiddenStateIncreaseCountAction()),
    };
}

export function connectHiddenState<C extends ComponentType<Matching<HiddenStateStateProps & HiddenStateDispatchProps, GetProps<C>>>, TOwnProps>(
    component: C
): ConnectedComponent<
    C,
    DistributiveOmit<GetLibraryManagedProps<C>, keyof Shared<HiddenStateStateProps & HiddenStateDispatchProps, GetLibraryManagedProps<C>>> & TOwnProps
> {
    return connect(mapStateToProps, mapDispatchToProps)(component);
}

import React from 'react';
import { Animate } from 'react-move';

class AnimatedProgressProvider extends React.Component<any, any> {
    // eslint-disable-next-line react/state-in-constructor
    state = {
        isAnimated: false,
    };

    // eslint-disable-next-line react/static-property-placement
    static defaultProps = {
        valueStart: 0,
    };

    componentDidMount(): void {
        this.setState({
            // eslint-disable-next-line react/no-access-state-in-setstate
            isAnimated: !this.state.isAnimated,
        });
    }

    render(): any {
        // @ts-ignore
        // @ts-ignore
        return (
            <Animate
                start={() => ({
                    value: this.props.valueStart,
                })}
                update={() => ({
                    value: [
                        this.state.isAnimated ? this.props.valueEnd : this.props.valueStart,
                    ],
                    timing: {
                        duration: this.props.duration * 1000,
                        ease: this.props.easingFunction,
                    },
                })}
            >
                {({ value }) =>
                    // @ts-ignore
                    // eslint-disable-next-line implicit-arrow-linebreak
                    this.props.children(value)}
            </Animate>
        );
    }
}

export default AnimatedProgressProvider;

"use client";
import { Text } from '@radix-ui/themes';
import ReactCountUp from 'react-countup';

const CountUp = ({end}: {end: number}) => {
    return (
        <ReactCountUp start={0} end={end} >
            {({ countUpRef }) => (
                <Text ref={countUpRef} size="4" weight="bold" />
            )}
        </ReactCountUp>
    )
}

export default CountUp
import { digitsEnToFa } from '@persian-tools/persian-tools';
import React, { useState } from 'react';
import { LineChart } from 'react-native-chart-kit';
import { Body } from '../../styles';
import { width } from '../../utils/deviceUi';
import { Wrapper, TooltipContainer, TooltipCount, TooltipLabel } from './style';
import { ChartType } from './type';
const height: number = 180;
export default function Chart(props: ChartType) {
  const { data } = props;
  let [tooltipPos, setTooltipPos] = useState({
    x: 0,
    y: 0,
    visible: false,
    value: 0,
    label: '',
    index: 0,
  });
  return (
    <Wrapper>
      <LineChart
        data={{
          labels: data.x,
          datasets: [
            {
              data: data.y,
            },
          ],
        }}
        bezier
        fromZero
        withInnerLines={false}
        withOuterLines={false}
        width={width} // from react-native
        height={height}
        yAxisInterval={1} // optional, defaults to 1
        chartConfig={{
          propsForLabels: { ...Body.Small },
          backgroundGradientFromOpacity: 0,
          backgroundGradientToOpacity: 0,
          decimalPlaces: 0, // optional, defaults to 2dp
          color: (opacity = 1) => `rgba(239, 65, 35, ${opacity})`,
          labelColor: (opacity = 0.5) => `rgba(0, 0, 0, ${opacity})`,
          fillShadowGradient: '#EF4123',
          fillShadowGradientOpacity: 0.6,
          strokeWidth: 2,
          propsForDots: {
            r: '3',
            strokeWidth: '0',
          },
        }}
        decorator={() => {
          if (tooltipPos.visible) {
            let x = tooltipPos.x;
            let y = tooltipPos.y;
            if (tooltipPos.index < 2) {
              x = x + 40;
            }
            if (tooltipPos.index > 4) {
              x = x - 40;
            }
            return (
              <TooltipContainer left={x} top={y}>
                {tooltipPos.value > 0 ? (
                  <TooltipCount>
                    {tooltipPos.value} {'سفارش'}
                  </TooltipCount>
                ) : (
                  <TooltipCount>بدون سفارش</TooltipCount>
                )}
                <TooltipLabel>{tooltipPos.label}</TooltipLabel>
              </TooltipContainer>
            );
          }
        }}
        onDataPointClick={({ index, value, x, y }) => {
          let isSamePoint = tooltipPos.x === x && tooltipPos.y === y;
          isSamePoint
            ? setTooltipPos((previousState) => {
                return {
                  ...previousState,
                  value,
                  label: data.label[index],
                  visible: !previousState.visible,
                  index,
                };
              })
            : setTooltipPos({
                x,
                y,
                value,
                label: data.label[index],
                visible: true,
                index,
              });
        }}
      />
    </Wrapper>
  );
}

import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";

const marks = [
  {
    value: 1,
    label: "1",
  },
  {
    value: 5,
    label: "5",
  },
  {
    value: 10,
    label: "10",
  },
  {
    value: 15,
    label: "15",
  },
  {
    value: 20,
    label: "20",
  },
];

export default function TaxiCountSlider(props: { onSliderChange: any }) {
  return (
    <div>
      <Typography id="discrete-slider-custom" gutterBottom>
        Number of taxis
      </Typography>
      <Slider
        min={1}
        max={20}
        defaultValue={10}
        step={1}
        valueLabelDisplay="auto"
        marks={marks}
        onChangeCommitted={(event, value) => props.onSliderChange(value)}
      />
    </div>
  );
}

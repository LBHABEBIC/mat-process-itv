import React from "react";
import { DynamicComponentControlledProps } from "remultiform/component-wrapper";
import { InputType, Input } from "lbh-frontend-react";

type Props = DynamicComponentControlledProps<{
  day: string;
  month: string;
  year: string;
}> & {
  name: string;
};

export const DateInput = (props: Props): React.ReactElement => {
  console.log("DateInputprops", props);
  const { name, value: date, onValueChange, disabled } = props;
  const dayInputName = `${name}-day`;
  const dayLabelId = `${dayInputName}-label`;
  const dayInputId = `${dayInputName}-input`;
  const monthInputName = `${name}-month`;
  const monthLabelId = `${monthInputName}-label`;
  const monthInputId = `${monthInputName}-input`;
  const yearInputName = `${name}-year`;
  const yearLabelId = `${yearInputName}-label`;
  const yearInputId = `${yearInputName}-input`;

  return (
    <div>
      <Input
        id={dayInputId}
        name={dayInputName}
        label={{ id: dayLabelId, children: "DD" }}
        type={InputType.Text}
        value={date.day}
        disabled={disabled}
        onChange={(value): void => {
          onValueChange({ ...date, day: value });
        }}
        aria-labelledby={dayLabelId}
        className="lbh-input--date--sm"
      />
      <Input
        id={monthInputId}
        name={monthInputName}
        label={{ id: monthLabelId, children: "MM" }}
        type={InputType.Text}
        value={date.month}
        disabled={disabled}
        onChange={(value): void => {
          onValueChange({ ...date, month: value });
        }}
        aria-labelledby={monthLabelId}
        className="lbh-input--date--sm"
      />
      <Input
        id={yearInputId}
        name={yearInputName}
        label={{ id: yearLabelId, children: "YYYY" }}
        type={InputType.Text}
        value={date.year}
        disabled={disabled}
        onChange={(value): void => {
          onValueChange({ ...date, year: value });
        }}
        aria-labelledby={yearLabelId}
        className="lbh-input--date--m"
      />

      <style jsx>{`
        div {
          display: flex;
        }

        div > :global(.govuk-form-group) {
          flex-direction: column;
          align-items: center;
          margin-right: 10px;
        }

        :global(.lbh-input--date--sm) {
          text-align: center;
          width: 50px;
        }

        :global(.lbh-input--date--m) {
          text-align: center;
          width: 80px;
        }
      `}</style>
    </div>
  );
};

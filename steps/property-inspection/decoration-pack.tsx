import {
  FieldsetLegend,
  Heading,
  HeadingLevels,
} from "lbh-frontend-react/components";
import React from "react";
import {
  ComponentDatabaseMap,
  ComponentWrapper,
  DynamicComponent,
  ComponentValue,
} from "remultiform/component-wrapper";
import { makeSubmit } from "../../components/makeSubmit";
import {
  PostVisitActionInput,
  PostVisitActionInputProps,
} from "../../components/PostVisitActionInput";
import { RadioButtons } from "../../components/RadioButtons";
import { ReviewNotes } from "../../components/ReviewNotes";
import { getRadioLabelFromValue } from "../../helpers/getRadioLabelFromValue";
import keyFromSlug from "../../helpers/keyFromSlug";
import ProcessStepDefinition from "../../helpers/ProcessStepDefinition";
import { Notes } from "../../storage/DatabaseSchema";
import ProcessDatabaseSchema from "../../storage/ProcessDatabaseSchema";
import PageSlugs from "../PageSlugs";
import PageTitles from "../PageTitles";

const decorationPackRadios = [
  {
    label: "Yes, pack delivered",
    value: "yes pack",
  },
  {
    label: "No, but property was decorated before tenant moved in",
    value: "no but decorated",
  },
  {
    label: "No, pack not delivered",
    value: "not delivered",
  },
];

const questions = {
  "decoration-pack-delivered": "Has the decoration pack been delivered?",
};

const step: ProcessStepDefinition<ProcessDatabaseSchema, "property"> = {
  title: PageTitles.DecorationPack,
  heading: "Decoration pack",
  review: {
    rows: [
      {
        label: questions["decoration-pack-delivered"],
        values: {
          "decoration-pack-delivered": {
            renderValue(isDecorationPack: string): React.ReactNode {
              return getRadioLabelFromValue(
                decorationPackRadios,
                isDecorationPack
              );
            },
          },
          "decoration-pack-notes": {
            renderValue(notes: Notes): React.ReactNode {
              if (notes.length === 0) {
                return;
              }

              return <ReviewNotes notes={notes} />;
            },
          },
        },
      },
    ],
  },
  step: {
    slug: PageSlugs.DecorationPack,
    nextSlug: PageSlugs.LaminatedFlooring,
    submit: (nextSlug?: string): ReturnType<typeof makeSubmit> =>
      makeSubmit({
        slug: nextSlug as PageSlugs | undefined,
        value: "Save and continue",
      }),
    componentWrappers: [
      ComponentWrapper.wrapDynamic(
        new DynamicComponent({
          key: "decoration-pack-delivered",
          Component: RadioButtons,
          props: {
            name: "decoration-pack-delivered",
            legend: (
              <FieldsetLegend>
                <Heading level={HeadingLevels.H2}>
                  {questions["decoration-pack-delivered"]}
                </Heading>
              </FieldsetLegend>
            ) as React.ReactNode,
            radios: decorationPackRadios,
          },
          defaultValue: "",
          emptyValue: "",
          databaseMap: new ComponentDatabaseMap<
            ProcessDatabaseSchema,
            "property"
          >({
            storeName: "property",
            key: keyFromSlug(),
            property: ["decorationPack", "hasDecorationPack"],
          }),
        })
      ),
      ComponentWrapper.wrapDynamic(
        new DynamicComponent({
          key: "decoration-pack-notes",
          Component: PostVisitActionInput,
          props: {
            label: {
              value: "Add note if necessary.",
            },
            name: "decoration-pack-notes",
          } as PostVisitActionInputProps,
          renderWhen(stepValues: {
            "decoration-pack-delivered"?: ComponentValue<
              ProcessDatabaseSchema,
              "property"
            >;
          }): boolean {
            return stepValues["decoration-pack-delivered"] === "not delivered";
          },
          defaultValue: [] as Notes,
          emptyValue: [] as Notes,
          databaseMap: new ComponentDatabaseMap<
            ProcessDatabaseSchema,
            "property"
          >({
            storeName: "property",
            key: keyFromSlug(),
            property: ["decorationPack", "notes"],
          }),
        })
      ),
    ],
  },
};

export default step;

import {
  FieldsetLegend,
  Paragraph,
  Heading,
  HeadingLevels,
} from "lbh-frontend-react/components";
import React from "react";
import {
  ComponentDatabaseMap,
  ComponentWrapper,
  DynamicComponent,
  StaticComponent,
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
import yesNoRadios from "../../helpers/yesNoRadios";
import { Notes } from "../../storage/DatabaseSchema";
import ProcessDatabaseSchema from "../../storage/ProcessDatabaseSchema";
import PageSlugs from "../PageSlugs";
import PageTitles from "../PageTitles";

const questions = {
  "tenant-knows-about-refuse":
    "Does the tenant know about refuse and recycling on the estate?",
  "tenant-has-food-bin": "Does the tenant have a food waste bin?",
};

const step: ProcessStepDefinition<ProcessDatabaseSchema, "property"> = {
  title: PageTitles.Refuse,
  heading: PageTitles.Refuse,
  review: {
    rows: [
      {
        label: questions["tenant-knows-about-refuse"],
        values: {
          "tenant-knows-about-refuse": {
            renderValue(tenantKnowsAboutRefuse: string): React.ReactNode {
              return getRadioLabelFromValue(
                yesNoRadios,
                tenantKnowsAboutRefuse
              );
            },
          },
          "tenant-has-food-bin": {
            renderValue(tenantHasFoodBin: string): React.ReactNode {
              return getRadioLabelFromValue(yesNoRadios, tenantHasFoodBin);
            },
          },
          "refuse-notes": {
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
    slug: PageSlugs.Refuse,
    nextSlug: PageSlugs.OtherComments,
    submit: (nextSlug?: string): ReturnType<typeof makeSubmit> =>
      makeSubmit({
        slug: nextSlug as PageSlugs | undefined,
        value: "Save and continue",
      }),
    componentWrappers: [
      ComponentWrapper.wrapStatic<ProcessDatabaseSchema, "property">(
        new StaticComponent({
          key: "paragraph-1",
          Component: Paragraph,
          props: {
            children: `Discuss with tenant about refuse disposal and recycling facilities available
`,
          },
        })
      ),
      ComponentWrapper.wrapStatic<ProcessDatabaseSchema, "property">(
        new StaticComponent({
          key: "paragraph-2",
          Component: Paragraph,
          props: {
            children: `Food waste bins can be ordered via 020 8356 6688 or [Council's website] (online only, opens in new tab)`,
          },
        })
      ),
      ComponentWrapper.wrapDynamic(
        new DynamicComponent({
          key: "tenant-knows-about-refuse",
          Component: RadioButtons,
          props: {
            name: "tenant-knows-about-refuse",
            legend: (
              <FieldsetLegend>
                <Heading level={HeadingLevels.H3}>
                  {questions["tenant-knows-about-refuse"]}
                </Heading>
              </FieldsetLegend>
            ) as React.ReactNode,
            radios: yesNoRadios,
          },
          defaultValue: "",
          emptyValue: "",
          databaseMap: new ComponentDatabaseMap<
            ProcessDatabaseSchema,
            "property"
          >({
            storeName: "property",
            key: keyFromSlug(),
            property: ["refuse", "tenantKnowsAboutRefuse"],
          }),
        })
      ),
      ComponentWrapper.wrapDynamic(
        new DynamicComponent({
          key: "tenant-has-food-bin",
          Component: RadioButtons,
          props: {
            name: "tenant-has-food-bin",
            legend: (
              <FieldsetLegend>
                <Heading level={HeadingLevels.H3}>
                  {questions["tenant-has-food-bin"]}
                </Heading>
              </FieldsetLegend>
            ) as React.ReactNode,
            radios: yesNoRadios,
          },
          defaultValue: "",
          emptyValue: "",
          databaseMap: new ComponentDatabaseMap<
            ProcessDatabaseSchema,
            "property"
          >({
            storeName: "property",
            key: keyFromSlug(),
            property: ["refuse", "tenantHasFoodBin"],
          }),
        })
      ),
      ComponentWrapper.wrapDynamic(
        new DynamicComponent({
          key: "refuse-notes",
          Component: PostVisitActionInput,
          props: {
            label: {
              value: (
                <>
                  Add note about antisocial behaviour <b>by</b> or{" "}
                  <b>against</b> tenant if necessary.
                </>
              ),
            },
            name: "refuse-notes",
          } as PostVisitActionInputProps,
          defaultValue: [] as Notes,
          emptyValue: [] as Notes,
          databaseMap: new ComponentDatabaseMap<
            ProcessDatabaseSchema,
            "property"
          >({
            storeName: "property",
            key: keyFromSlug(),
            property: ["refuse", "notes"],
          }),
        })
      ),
    ],
  },
};

export default step;

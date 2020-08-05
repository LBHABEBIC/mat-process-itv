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
import { Paragraph, Link } from "lbh-frontend-react/components";

const questions = {
  "has-alterations": "Have any alterations been made to the property?",
};

const step: ProcessStepDefinition<ProcessDatabaseSchema, "property"> = {
  title: PageTitles.Alterations,
  heading: "",
  review: {
    rows: [
      {
        label: questions["has-alterations"],
        values: {
          "has-alterations": {
            renderValue(hasAlterations: string): React.ReactNode {
              return getRadioLabelFromValue(yesNoRadios, hasAlterations);
            },
          },
          "alterations-notes": {
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
    slug: PageSlugs.Alterations,
    nextSlug: PageSlugs.Garden,
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
            children: `Explain the alterations procedure and that written permission is required before any alterations or improvements cannot be carried out.`,
          },
        })
      ),
      ComponentWrapper.wrapStatic<ProcessDatabaseSchema, "property">(
        new StaticComponent({
          key: "paragraph-2",
          Component: Paragraph,
          props: {
            children: (
              //TODO add correct url
              <>
                Information about alterations is in{" "}
                <Link href={""} target="_blank">
                  [Your Tenancy conditions: section 4.19]
                </Link>{" "}
                (online only, opens in a new tab)
              </>
            ),
          },
        })
      ),
      ComponentWrapper.wrapDynamic(
        new DynamicComponent({
          key: "has-alterations;",
          Component: RadioButtons,
          props: {
            name: "has-alterations;",
            legend: (
              <FieldsetLegend>
                <Heading level={HeadingLevels.H2}>
                  {questions["has-alterations"]}
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
            property: ["alterations", "hasAlterations"],
          }),
        })
      ),
      ComponentWrapper.wrapDynamic(
        new DynamicComponent({
          key: "alterations-notes",
          Component: PostVisitActionInput,
          props: {
            label: {
              value: "Add note about alterations made to property by tenant.",
            },
            name: "alterations-notes",
          } as PostVisitActionInputProps,
          defaultValue: [] as Notes,
          emptyValue: [] as Notes,
          databaseMap: new ComponentDatabaseMap<
            ProcessDatabaseSchema,
            "property"
          >({
            storeName: "property",
            key: keyFromSlug(),
            property: ["alterations", "notes"],
          }),
        })
      ),
    ],
  },
};

export default step;

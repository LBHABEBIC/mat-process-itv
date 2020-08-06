import {
  FieldsetLegend,
  Paragraph,
  Heading,
  HeadingLevels,
  Link,
} from "lbh-frontend-react/components";
import React from "react";
import {
  ComponentDatabaseMap,
  ComponentWrapper,
  DynamicComponent,
  StaticComponent,
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
import yesNoRadios from "../../helpers/yesNoRadios";
import { Notes } from "../../storage/DatabaseSchema";
import ProcessDatabaseSchema from "../../storage/ProcessDatabaseSchema";
import PageSlugs from "../PageSlugs";
import PageTitles from "../PageTitles";

const questions = {
  "tenant-has-booklet":
    "Has the tenant got a copy of the 'Welcome to Hackney' booklet?",
  "tenant-has-home-queries":
    "Does the tenant have any queries about their new home?",
  "tenant-has-facilities-queries":
    "Does the tenant have any queries about their estate and facilities?",
};

const step: ProcessStepDefinition<ProcessDatabaseSchema, "property"> = {
  title: PageTitles.Queries,
  heading: PageTitles.Queries,
  review: {
    rows: [
      {
        label: questions["tenant-has-home-queries"],
        values: {
          "tenant-has-home-queries": {
            renderValue(tenantHasHomeQueries: string): React.ReactNode {
              return getRadioLabelFromValue(yesNoRadios, tenantHasHomeQueries);
            },
          },
          homeQueriesNotes: {
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
    slug: PageSlugs.Queries,
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
            children: (
              <>
                <Link href="https://hackney.gov.uk/tenants" target="_blank">
                  Welcome to Hackney: Your tenancy guide
                </Link>{" "}
                (online only, opens in a new tab) has useful phone numbers and
                links to websites, and guidance for the tenant about moving in
                to their new home.
              </>
            ),
          },
        })
      ),
      ComponentWrapper.wrapDynamic(
        new DynamicComponent({
          key: "tenant-has-booklet",
          Component: RadioButtons,
          props: {
            name: "tenant-has-booklet",
            legend: (
              <FieldsetLegend>
                <Heading level={HeadingLevels.H3}>
                  {questions["tenant-has-booklet"]}
                </Heading>
              </FieldsetLegend>
            ) as React.ReactNode,
            radios: yesNoRadios,
          },
          defaultValue: "no",
          emptyValue: "",
          databaseMap: new ComponentDatabaseMap<
            ProcessDatabaseSchema,
            "property"
          >({
            storeName: "property",
            key: keyFromSlug(),
            property: ["queries", "tenantHasBooklet"],
          }),
        })
      ),
      ComponentWrapper.wrapDynamic(
        new DynamicComponent({
          key: "bookletNotes",
          Component: PostVisitActionInput,
          props: {
            label: { value: "Add note if necessary" },
            name: "bookletNotes",
          } as PostVisitActionInputProps,
          defaultValue: [] as Notes,
          emptyValue: [] as Notes,
          databaseMap: new ComponentDatabaseMap<
            ProcessDatabaseSchema,
            "property"
          >({
            storeName: "property",
            key: keyFromSlug(),
            property: ["queries", "bookletNotes"],
          }),
          renderWhen(stepValues: {
            "tenant-has-booklet"?: ComponentValue<
              ProcessDatabaseSchema,
              "property"
            >;
          }): boolean {
            return stepValues["tenant-has-booklet"] === "no";
          },
        })
      ),
      ComponentWrapper.wrapDynamic(
        new DynamicComponent({
          key: "tenant-has-home-queries",
          Component: RadioButtons,
          props: {
            name: "tenant-has-home-queries",
            legend: (
              <FieldsetLegend>
                <Heading level={HeadingLevels.H3}>
                  {questions["tenant-has-home-queries"]}
                </Heading>
              </FieldsetLegend>
            ) as React.ReactNode,
            radios: yesNoRadios,
          },
          defaultValue: "yes",
          emptyValue: "",
          databaseMap: new ComponentDatabaseMap<
            ProcessDatabaseSchema,
            "property"
          >({
            storeName: "property",
            key: keyFromSlug(),
            property: ["queries", "tenantHasHomeQueries"],
          }),
        })
      ),
      ComponentWrapper.wrapDynamic(
        new DynamicComponent({
          key: "homeQueriesNotes",
          Component: PostVisitActionInput,
          props: {
            label: { value: "Add note if necessary" },
            name: "homeQueriesNotes",
          } as PostVisitActionInputProps,
          defaultValue: [] as Notes,
          emptyValue: [] as Notes,
          databaseMap: new ComponentDatabaseMap<
            ProcessDatabaseSchema,
            "property"
          >({
            storeName: "property",
            key: keyFromSlug(),
            property: ["queries", "homeQueriesNotes"],
          }),
          renderWhen(stepValues: {
            "tenant-has-home-queries"?: ComponentValue<
              ProcessDatabaseSchema,
              "property"
            >;
          }): boolean {
            return stepValues["tenant-has-home-queries"] === "yes";
          },
        })
      ),
      ComponentWrapper.wrapDynamic(
        new DynamicComponent({
          key: "tenant-has-facilities-queries",
          Component: RadioButtons,
          props: {
            name: "tenant-has-facilities-queries",
            legend: (
              <FieldsetLegend>
                <Heading level={HeadingLevels.H3}>
                  {questions["tenant-has-facilities-queries"]}
                </Heading>
              </FieldsetLegend>
            ) as React.ReactNode,
            radios: yesNoRadios,
          },
          defaultValue: "yes",
          emptyValue: "",
          databaseMap: new ComponentDatabaseMap<
            ProcessDatabaseSchema,
            "property"
          >({
            storeName: "property",
            key: keyFromSlug(),
            property: ["queries", "tenantHasFacilitiesQueries"],
          }),
        })
      ),
      ComponentWrapper.wrapDynamic(
        new DynamicComponent({
          key: "facilitiesQueriesNotes",
          Component: PostVisitActionInput,
          props: {
            label: { value: "Add note if necessary" },
            name: "facilitiesQueriesNotes",
          } as PostVisitActionInputProps,
          defaultValue: [] as Notes,
          emptyValue: [] as Notes,
          databaseMap: new ComponentDatabaseMap<
            ProcessDatabaseSchema,
            "property"
          >({
            storeName: "property",
            key: keyFromSlug(),
            property: ["queries", "facilitiesQueriesNotes"],
          }),
          renderWhen(stepValues: {
            "tenant-has-facilities-queries"?: ComponentValue<
              ProcessDatabaseSchema,
              "property"
            >;
          }): boolean {
            return stepValues["tenant-has-facilities-queries"] === "yes";
          },
        })
      ),
    ],
  },
};

export default step;

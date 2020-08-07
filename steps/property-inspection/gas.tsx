import {
  FieldsetLegend,
  Paragraph,
  Heading,
  HeadingLevels,
} from "lbh-frontend-react/components";
import React from "react";
import {
  ComponentDatabaseMap,
  ComponentValue,
  ComponentWrapper,
  DynamicComponent,
  StaticComponent,
} from "remultiform/component-wrapper";
import { ImageInput } from "../../components/ImageInput";
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
import { DateInput } from "components/DateInput";

const questions = {
  "has-boiler-checked":
    "Has the Gas team visited to check the boiler, hot water and heating are working?",
};

const gasRadios = [
  {
    label: "Yes and tenant has copy of certificate",
    value: "yesTenantHasCertificate",
  },
  {
    label: "Yes, but tenant does not have copy of certificate",
    value: "yesTenantDoesNotHaveCertificate",
  },
  {
    label: "No, not visited but appointment arranged",
    value: "noAppointmentArranged",
  },
  {
    label: "No, no visit arranged",
    value: "noVisitArranged",
  },
  {
    label: "No, property does not have gas",
    value: "noGas",
  },
];

const step: ProcessStepDefinition<ProcessDatabaseSchema, "property"> = {
  title: PageTitles.Gas,
  heading: "Gas",
  review: {
    rows: [
      {
        label: questions["has-boiler-checked"],
        values: {
          "has-boiler-checked": {
            renderValue(hasBoilerChecked: string): React.ReactNode {
              return getRadioLabelFromValue(gasRadios, hasBoilerChecked);
            },
          },
          "boiler-checked-notes": {
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
    slug: PageSlugs.Gas,
    nextSlug: PageSlugs.DecorationPack,
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
            children: `It is essential that the gas re-commissioning is undertaken for safety reasons.  If it has not been completed make urgent arrangements for it to be done as soon as possible.`,
          },
        })
      ),
      ComponentWrapper.wrapStatic<ProcessDatabaseSchema, "property">(
        new StaticComponent({
          key: "paragraph-2",
          Component: Paragraph,
          props: {
            children: `Hackney Gas team: 020 8356 8828`,
          },
        })
      ),
      ComponentWrapper.wrapDynamic(
        new DynamicComponent({
          key: "has-boiler-checked",
          Component: RadioButtons,
          props: {
            name: "has-boiler-checked",
            legend: (
              <FieldsetLegend>
                <Heading level={HeadingLevels.H2}>
                  {questions["has-boiler-checked"]}
                </Heading>
              </FieldsetLegend>
            ) as React.ReactNode,
            radios: gasRadios,
          },
          defaultValue: "",
          emptyValue: "",
          databaseMap: new ComponentDatabaseMap<
            ProcessDatabaseSchema,
            "property"
          >({
            storeName: "property",
            key: keyFromSlug(),
            property: ["gas", "hasBoilerChecked"],
          }),
        })
      ),
      ComponentWrapper.wrapStatic<ProcessDatabaseSchema, "property">(
        new StaticComponent({
          key: "heading-2",
          Component: Heading,
          props: {
            level: HeadingLevels.H3,
            children: `Gas recommissioning visit details`,
          },
          renderWhen(stepValues: {
            "has-boiler-checked"?: ComponentValue<
              ProcessDatabaseSchema,
              "property"
            >;
          }): boolean {
            return (
              stepValues["has-boiler-checked"] === "yesTenantHasCertificate" ||
              stepValues["has-boiler-checked"] ===
                "yesTenantDoesNotHaveCertificate" ||
              stepValues["has-boiler-checked"] === "noVisitArranged" ||
              stepValues["has-boiler-checked"] === "noAppointmentArranged"
            );
          },
        })
      ),
      ComponentWrapper.wrapDynamic(
        new DynamicComponent({
          key: "boiler-certificate-images",
          Component: ImageInput,
          props: {
            label: "Take a photo of certificate",
            name: "boiler-certificate-images",
            maxCount: 1 as number | null | undefined,
          },
          renderWhen(stepValues: {
            "has-boiler-checked"?: ComponentValue<
              ProcessDatabaseSchema,
              "property"
            >;
          }): boolean {
            return (
              stepValues["has-boiler-checked"] === "yesTenantHasCertificate"
            );
          },
          defaultValue: [],
          emptyValue: [] as string[],
          databaseMap: new ComponentDatabaseMap<
            ProcessDatabaseSchema,
            "property"
          >({
            storeName: "property",
            key: keyFromSlug(),
            property: ["gas", "images"],
          }),
        })
      ),
      ComponentWrapper.wrapStatic<ProcessDatabaseSchema, "property">(
        new StaticComponent({
          key: "heading-3",
          Component: Heading,
          props: {
            level: HeadingLevels.H4,
            children: `Date of visit eg 01/07/2018`,
          },
          renderWhen(stepValues: {
            "has-boiler-checked"?: ComponentValue<
              ProcessDatabaseSchema,
              "property"
            >;
          }): boolean {
            return (
              stepValues["has-boiler-checked"] === "yesTenantHasCertificate" ||
              stepValues["has-boiler-checked"] ===
                "yesTenantDoesNotHaveCertificate" ||
              stepValues["has-boiler-checked"] === "noAppointmentArranged"
            );
          },
        })
      ),
      ComponentWrapper.wrapDynamic(
        new DynamicComponent({
          key: "gas-recommissioning-visit-date",
          Component: DateInput,
          props: {
            name: "gas-recommissioning-visit-date",
          },
          renderWhen(stepValues: {
            "has-boiler-checked"?: ComponentValue<
              ProcessDatabaseSchema,
              "property"
            >;
          }): boolean {
            return (
              stepValues["has-boiler-checked"] === "yesTenantHasCertificate" ||
              stepValues["has-boiler-checked"] ===
                "yesTenantDoesNotHaveCertificate" ||
              stepValues["has-boiler-checked"] === "noAppointmentArranged"
            );
          },
          defaultValue: {} as { day: ""; month: ""; year: "" },
          emptyValue: {} as { day: ""; month: ""; year: "" },
          databaseMap: new ComponentDatabaseMap<
            ProcessDatabaseSchema,
            "property"
          >({
            storeName: "property",
            key: keyFromSlug(),
            property: ["gas", "visitDate"],
          }),
        })
      ),
      ComponentWrapper.wrapDynamic(
        new DynamicComponent({
          key: "boiler-checked-notes",
          Component: PostVisitActionInput,
          props: {
            label: {
              value: "Add note if necessary.",
            },
            name: "boiler-checked-notes",
          } as PostVisitActionInputProps,
          renderWhen(stepValues: {
            "has-boiler-checked"?: ComponentValue<
              ProcessDatabaseSchema,
              "property"
            >;
          }): boolean {
            return (
              stepValues["has-boiler-checked"] === "yesTenantHasCertificate" ||
              stepValues["has-boiler-checked"] ===
                "yesTenantDoesNotHaveCertificate" ||
              stepValues["has-boiler-checked"] === "noVisitArranged" ||
              stepValues["has-boiler-checked"] === "noAppointmentArranged"
            );
          },
          defaultValue: [] as Notes,
          emptyValue: [] as Notes,
          databaseMap: new ComponentDatabaseMap<
            ProcessDatabaseSchema,
            "property"
          >({
            storeName: "property",
            key: keyFromSlug(),
            property: ["gas", "notes"],
          }),
        })
      ),
    ],
  },
};

export default step;

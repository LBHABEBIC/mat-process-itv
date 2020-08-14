import React from "react";
import { Heading, HeadingLevels } from "lbh-frontend-react";
import {
  ComponentDatabaseMap,
  ComponentWrapper,
  DynamicComponent,
  StaticComponent,
} from "remultiform/component-wrapper";
import { makeSubmit } from "../../components/makeSubmit";
import { TextInput } from "../../components/TextInput";
import keyFromSlug from "../../helpers/keyFromSlug";
import ProcessStepDefinition from "../../helpers/ProcessStepDefinition";
import ResidentDatabaseSchema from "../../storage/ResidentDatabaseSchema";
import { ReviewNotes } from "../../components/ReviewNotes";
import Storage from "../../storage/Storage";
import PageSlugs from "../PageSlugs";
import PageTitles from "../PageTitles";
import { RadioButtons } from "../../components/RadioButtons";
import { getRadioLabelFromValue } from "../../helpers/getRadioLabelFromValue";
import yesNoRadios from "helpers/yesNoRadios";
import { Notes } from "../../storage/DatabaseSchema";
import { FieldsetLegend } from "lbh-frontend-react/components";
import {
  PostVisitActionInput,
  PostVisitActionInputProps,
} from "../../components/PostVisitActionInput";

const questions = {
  "gp-signed-up": "Has the tenant signed up with a local GP?",
  "other-support-details": "Does the tenant get support from other services?",
};

const step: ProcessStepDefinition<ResidentDatabaseSchema, "otherSupport"> = {
  title: PageTitles.OtherSupport,
  heading: "GP and other support",
  context: Storage.ResidentContext,
  review: {
    rows: [
      {
        label: questions["gp-signed-up"],
        values: {
          "gp-signed-up": {
            renderValue(hasSignedUp: string): React.ReactNode {
              return getRadioLabelFromValue(yesNoRadios, hasSignedUp);
            },
          },
          "gp-other-notes": {
            renderValue(notes: Notes): React.ReactNode {
              if (notes.length === 0) {
                return;
              }
              return <ReviewNotes notes={notes} />;
            },
          },
        },
      },
      {
        label: questions["other-support-details"],
        values: {
          "other-support-full-name": {
            renderValue(name: string): React.ReactNode {
              return name;
            },
          },
          "other-support-role": {
            renderValue(role: string): React.ReactNode {
              return role;
            },
          },
          "other-support-organisation": {
            renderValue(organisation: string): React.ReactNode {
              return organisation;
            },
          },
          "other-support-phone-number": {
            renderValue(phoneNumber: string): React.ReactNode {
              return phoneNumber;
            },
          },
        },
      },
    ],
  },
  step: {
    slug: PageSlugs.OtherSupport,
    nextSlug: PageSlugs.Sections,
    submit: (nextSlug?: string): ReturnType<typeof makeSubmit> =>
      makeSubmit({
        slug: nextSlug as PageSlugs | undefined,
        value: "Save and continue",
      }),
    componentWrappers: [
      ComponentWrapper.wrapDynamic(
        new DynamicComponent({
          key: "gp-signed-up",
          Component: RadioButtons,
          props: {
            name: "gp-signed-up",
            legend: (
              <FieldsetLegend>
                <Heading level={HeadingLevels.H3}>
                  {questions["gp-signed-up"]}
                </Heading>
              </FieldsetLegend>
            ) as React.ReactNode,
            radios: yesNoRadios,
          },
          defaultValue: "",
          emptyValue: "",
          databaseMap: new ComponentDatabaseMap<
            ResidentDatabaseSchema,
            "otherSupport"
          >({
            storeName: "otherSupport",
            key: keyFromSlug(true),
            property: ["hasSignedUp"],
          }),
        })
      ),
      ComponentWrapper.wrapDynamic(
        new DynamicComponent({
          key: "gp-other-notes",
          Component: PostVisitActionInput,
          props: {
            label: {
              value: "Add notes about signing up with a local GP if necessary",
            },
            name: "gp-other-notes",
          } as PostVisitActionInputProps,
          defaultValue: [] as Notes,
          emptyValue: [] as Notes,
          databaseMap: new ComponentDatabaseMap<
            ResidentDatabaseSchema,
            "otherSupport"
          >({
            storeName: "otherSupport",
            key: keyFromSlug(true),
            property: ["notes"],
          }),
        })
      ),
      ComponentWrapper.wrapStatic<ResidentDatabaseSchema, "otherSupport">(
        new StaticComponent({
          key: "other-support-heading",
          Component: Heading,
          props: {
            level: HeadingLevels.H2,
            children: questions["other-support-details"],
          },
        })
      ),
      ComponentWrapper.wrapDynamic(
        new DynamicComponent({
          key: "other-support-full-name",
          Component: TextInput,
          props: {
            name: "other-support-full-name",
            label: "Full name",
          },
          defaultValue: "",
          emptyValue: "",
          databaseMap: new ComponentDatabaseMap<
            ResidentDatabaseSchema,
            "otherSupport"
          >({
            storeName: "otherSupport",
            key: keyFromSlug(),
            property: ["fullName"],
          }),
        })
      ),
      ComponentWrapper.wrapDynamic(
        new DynamicComponent({
          key: "other-support-role",
          Component: TextInput,
          props: {
            name: "other-support-role",
            label: "Role (e.g. support worker, social worker, doctor)",
          },
          defaultValue: "",
          emptyValue: "",
          databaseMap: new ComponentDatabaseMap<
            ResidentDatabaseSchema,
            "otherSupport"
          >({
            storeName: "otherSupport",
            key: keyFromSlug(),
            property: ["role"],
          }),
        })
      ),
      ComponentWrapper.wrapDynamic(
        new DynamicComponent({
          key: "other-support-organisation",
          Component: TextInput,
          props: {
            name: "other-support-organisation",
            label: "organisation",
          },
          defaultValue: "",
          emptyValue: "",
          databaseMap: new ComponentDatabaseMap<
            ResidentDatabaseSchema,
            "otherSupport"
          >({
            storeName: "otherSupport",
            key: keyFromSlug(),
            property: ["organisation"],
          }),
        })
      ),
      ComponentWrapper.wrapDynamic(
        new DynamicComponent({
          key: "other-support-phone-number",
          Component: TextInput,
          props: {
            name: "other-support-phone-number",
            label: "Phone number",
          },
          defaultValue: "",
          emptyValue: "",
          databaseMap: new ComponentDatabaseMap<
            ResidentDatabaseSchema,
            "otherSupport"
          >({
            storeName: "otherSupport",
            key: keyFromSlug(),
            property: ["phoneNumber"],
          }),
        })
      ),
    ],
  },
};

export default step;

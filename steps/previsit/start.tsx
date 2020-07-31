import { Link } from "lbh-frontend-react";
import { List, ListProps, ListTypes } from "lbh-frontend-react/components/List";
import {
  Heading,
  HeadingLevels,
} from "lbh-frontend-react/components/typography/Heading";
import { Paragraph } from "lbh-frontend-react/components/typography/Paragraph";
import React from "react";
import {
  ComponentWrapper,
  StaticComponent,
} from "remultiform/component-wrapper";
import { makeSubmit } from "../../components/makeSubmit";
import { makeUnableToEnterSubmit } from "../../components/makeUnableToEnterSubmit";
import PageSlugs from "../PageSlugs";
import PageTitles from "../PageTitles";

const step = {
  title: PageTitles.Start,
  heading: "Start Introductory Tenancy Visit",
  step: {
    slug: PageSlugs.Start,
    nextSlug: PageSlugs.Sections,
    submit: (nextSlug?: string): ReturnType<typeof makeSubmit> =>
      makeUnableToEnterSubmit({
        slug: nextSlug as PageSlugs | undefined,
        value: "Start visit with tenant",
      }),
    componentWrappers: [
      ComponentWrapper.wrapStatic(
        new StaticComponent({
          key: "heading",
          Component: Heading,
          props: {
            level: HeadingLevels.H2,
            children: "About Introductory Tenancy Visit",
          },
        })
      ),
      ComponentWrapper.wrapStatic(
        new StaticComponent({
          key: "paragraph-1",
          Component: Paragraph,
          props: {
            children: (
              <strong>
                Please read the following text to the tenant(s) to explain why
                we collect information from them and what we do with it.
              </strong>
            ),
          },
        })
      ),
      ComponentWrapper.wrapStatic(
        new StaticComponent({
          key: "paragraph-2",
          Component: Paragraph,
          props: {
            children: "The purpose of this Introductory Tenancy Visit is",
          },
        })
      ),
      ComponentWrapper.wrapStatic(
        new StaticComponent({
          key: "paragraph-3-list",
          Component: List,
          props: {
            items: [
              "to check you've moved into the property OK",
              "to check that there are no outstanding repairs",
              "to see if you have any queries about your tenancy or the estate",
            ],
            type: ListTypes.Bullet,
          } as ListProps,
        })
      ),
      ComponentWrapper.wrapStatic(
        new StaticComponent({
          key: "paragraph-4",
          Component: Paragraph,
          props: {
            children:
              "I'll be checking your proof of ID and making sure you understand the conditions of your tenancy.",
          },
        })
      ),
      ComponentWrapper.wrapStatic(
        new StaticComponent({
          key: "paragraph-5",
          Component: Paragraph,
          props: {
            children:
              "All the information collected from you will be stored electronically and kept secure. Once stored, it can be accessed by the Council’s Housing team and may be shared internally and with partner organisations, for instance, if you have medical or support needs.",
          },
        })
      ),
      ComponentWrapper.wrapStatic(
        new StaticComponent({
          key: "paragraph-6",
          Component: Paragraph,
          props: {
            children:
              "We will keep your information for as long as the Council’s data retention schedule permits.",
          },
        })
      ),
      ComponentWrapper.wrapStatic(
        new StaticComponent({
          key: "paragraph-7",
          Component: Paragraph,
          props: {
            children: (
              <>
                More about how we hold information about you and your access to
                it can be found on the{" "}
                <Link href={"https://hackney.gov.uk/privacy"} target="_blank">
                  privacy notice page
                </Link>{" "}
                (opens in a new tab) of the Hackney Council website.
              </>
            ),
          },
        })
      ),
      ComponentWrapper.wrapStatic(
        new StaticComponent({
          key: "paragraph-8",
          Component: Paragraph,
          props: {
            children: "Are you OK to start this visit?",
          },
        })
      ),
    ],
  },
};

export default step;

import { PostStatus } from "../interface/PostData";
import { PostFormValues } from "../interface/PostFormValues";

export const validatePostFormValues = (values: PostFormValues) => {
  const errors: any = {};

  if (!values.title) {
    errors.title = "Required";
  }
  if (!values.body) {
    errors.body = "Required";
  }
  if (!validPostStatus(values.status)) {
    errors.published = "Invalid status";
  }
  if (values.status === "draft") {
    if (values.publish_date_string.length > 0) {
      errors.status = "Don't set post date for draft";
    }
  } else {
    if (values.publish_date_string.length === 0) {
      errors.status = "Post date required";
    }
  }
  if (!validPostSlug(values.slug)) {
    errors.slug = "allowed characters a-z, 0-9, _, -";
  }
  return errors;
};

export function validPostStatus(status: PostStatus) {
  return status === "draft" || status === "published";
}

export function validPostSlug(slug: string | undefined) {
  if (slug == null || slug.length === 0) {
    return true;
  }
  return validPostSlugFormat(slug);
}

export function hasForwardSlash(text: string) {
  return /\/+/.test(text);
}

export function validPostSlugFormat(text: string) {
  return /^[a-z]+[a-z0-9_\-]*$/i.test(text);
}


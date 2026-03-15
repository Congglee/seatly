import slugify from "slugify";

export const generateSlugUrl = ({ name, id }: { name: string; id: string }) => {
  return `${slugify(name)}-i.${id}`;
};

export const getIdFromSlugUrl = (slug: string) => {
  const match = slug.match(/-i\.(.+)$/);

  if (!match) {
    return null;
  }

  return match[1];
};

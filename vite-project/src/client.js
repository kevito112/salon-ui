import sanityClient from "@sanity/client";

export default sanityClient({
  projectId: "6rp890we",
  dataset: "production",
  useCdn: true,
});
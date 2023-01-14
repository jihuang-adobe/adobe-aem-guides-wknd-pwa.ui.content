import { sanitizeActivity } from "./sanitizeActivity";

export const getCategoriesFromData = (items) => {
  let categories = { };
  items.forEach(item => {
    if (!item.activity) categories.miscellaneous = item;
    else {
      const activity = sanitizeActivity(item.activity);
      if (!categories.hasOwnProperty(activity)) {
        categories[activity] = item
      }
    }
  })

  return categories;
}
import sql from "better-sqlite3";
import fs from "node:fs";

import slugify from "slugify";
import xss from "xss";

const db = sql("meals.db");

export const getMeals = async () => {
  //throw new Error("Testing");
  await new Promise((resolve) => setTimeout(resolve, 2000));

  return db.prepare("SELECT * FROM meals").all();
};

export const getMeal = (slug) => {
  return db.prepare("SELECT * FROM meals WHERE slug=?").get(slug);
};

export const saveMeal = async (meal) => {
  meal.slug = slugify(meal.title, {
    lower: true,
  });

  meal.instructions = xss(meal.instructions);

  const extenstion = meal.image.name.split(".").pop();
  const uniqueIdentifier = (Math.random() + 1).toString(36).substring(7);
  const fileName = `${meal.slug}-${uniqueIdentifier}.${extenstion}`;

  const stream = fs.WriteStream(`public/images/${fileName}`);
  const bufferedImage = await meal.image.arrayBuffer();
  stream.write(Buffer.from(bufferedImage), (error) => {
    if (error) {
      throw new Error("Saving image failed");
    }
  });

  meal.image = `/images/${fileName}`;

  db.prepare(
    `
    INSERT INTO meals
  (slug, title,image, summary, instructions, creator, creator_email)
  VALUES (
         @slug,
         @title,
         @image,
         @summary,
         @instructions,
         @creator,
         @creator_email
  )
    `
  ).run(meal);
};

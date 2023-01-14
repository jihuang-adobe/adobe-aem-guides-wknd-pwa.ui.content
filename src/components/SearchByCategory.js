import React, { useState } from "react"
import { Link } from 'react-router-dom';
import Error from "../screens/Error";
import { useGraphQL, adventureListQuery } from "../api";
import { getCategoriesFromData, getCategoryItemsByKey } from "../utils";
import "./SearchByCategory.css";

export default function SearchByCategory() {

  const [selectedActivity, setSelectedActivity] = useState(false);
  const [categories, setCategories] = useState(false);
  const [categoryItems, setCategoryItems] = useState([]);

  const { graphQLData, errors } = useGraphQL(adventureListQuery);

  if (errors !== null && graphQLData === false) return <Error error={errors} />;
  if (graphQLData === null) return <div>Loading...</div>;

  if (!categories && graphQLData?.adventureList?.items) {
    setCategories(getCategoriesFromData(graphQLData.adventureList.items))
  }

  const setCategory = (activity) => {
    setSelectedActivity(activity);
    setCategoryItems(getCategoryItemsByKey(graphQLData.adventureList.items, activity))
  }

  return (
    <>
      <div className="search-by-category-container">
        <ul className="search-by-category">
          {categories && Object.keys(categories).map((key, index) => {
            const category = categories[key];
            const selectedClassName = selectedActivity === category.activity ? "selected" : "";
            if (category.title && category.primaryImage && category.activity) {
              return (
                <li key={key} className="search-by-category-item" onClick={() => setCategory(category.activity)}>
                  <img
                    className={`search-by-category-item-image ${selectedClassName}`}
                    src={category.primaryImage._path}
                    alt={category.title}
                  />
                  <p>{category.activity || "Miscellaneous"}</p>
                </li>
              )
            } else {
              return <></>
            }
          })}
        </ul>
      </div>
      <div className="search-by-category-container">
        <ul className="search-by-category">
          {categoryItems && categoryItems.map((item, key) => (
            <li key={key} className="search-by-category-item">
              <Link to={`/detail?_path=${item._path}`}>
                <img className="search-by-category-item-image" src={item.primaryImage._path} alt={item.title} />
                <p>{item.title}</p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}

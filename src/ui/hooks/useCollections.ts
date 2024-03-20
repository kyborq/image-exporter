import { useState } from "react";

import { Element } from "@ui/models/element.model";
import { TCollection } from "@ui/models/label.model";
import { uuid } from "@ui/utils/uuid.util";

export const useCollections = () => {
  const [collections, setCollections] = useState<TCollection[]>([]);

  const createCollection = (name: string, elements: Element[]) => {
    const collection: TCollection = {
      id: uuid(),
      elements,
      name,
    };

    setCollections((collections) => [...collections, collection]);
  };

  const deleteCollection = (id: string) => {
    setCollections((collections) =>
      collections.filter((collection) => collection.id !== id)
    );
  };

  const renameCollection = (id: string, name: string) => {
    setCollections((collections) =>
      collections.map((collection) =>
        collection.id === id ? { ...collection, name } : collection
      )
    );
  };

  const deleteItem = (collectionId: string, id: string) => {
    setCollections((collections) =>
      collections.map((collection) =>
        collection.id === collectionId
          ? {
              ...collection,
              elements: collection.elements.filter(
                (element) => element.id !== id
              ),
            }
          : collection
      )
    );
  };

  return {
    collections,
    createCollection,
    deleteCollection,
    renameCollection,
    deleteItem,
  };
};

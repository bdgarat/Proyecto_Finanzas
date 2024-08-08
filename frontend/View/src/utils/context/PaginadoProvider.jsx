import React, { createContext, useState } from "react";
export const PaginadoContext = createContext({});
function PaginadoProvider({children}) { 
  var page = 0;
  var nextPage = 0;
  var lastPage = 0;
 
  function setNextPage(value) {
    nextPage = value;
  }
  function setPage(value) {
    page = value;
  }
  function setLastPage(value) {
    lastPage = value;
  }
  function getPage() {
    return page;
  }
  function getNextPage() {
    return nextPage;
  }
  function getLastPage() {
    return lastPage;
  }
  return (
    <PaginadoContext.Provider
      value={{
        getPage,
        setPage,
        getNextPage,
        setNextPage,
        getLastPage,
        setLastPage,
      }}
    >
      {children}
    </PaginadoContext.Provider>
  );
}

export default PaginadoProvider;
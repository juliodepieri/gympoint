import React, { useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';

import { MdNavigateBefore, MdNavigateNext } from 'react-icons/md';

import { PaginationWrapper, Button } from './styles';

export default function Pagination({ callback }) {
  const [currentPage, setCurrentPage] = useState(1);

  const range = (start, stop, step) =>
    Array.from(
      { length: (stop - start) / step + 1 },
      (_, i) => start + i * step
    );

  const pages = useMemo(() => {
    if (currentPage <= 5) {
      return range(1, 5, 1);
    }
    return range(currentPage - 2, currentPage + 2, 1);
  }, [currentPage]);

  useEffect(() => {
    callback(currentPage);
  }, [callback, currentPage]);

  function handleNext() {
    setCurrentPage(currentPage + 1);
  }

  function handlePrevious() {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  }

  return (
    <PaginationWrapper>
      <Button type="button" title="Página anterior" onClick={handlePrevious}>
        <MdNavigateBefore />
      </Button>

      {pages.map(p => (
        <Button
          key={String(p)}
          type="button"
          onClick={() => setCurrentPage(p)}
          active={p === currentPage}
        >
          {p}
        </Button>
      ))}

      <Button type="button" title="Próxima página" onClick={handleNext}>
        <MdNavigateNext />
      </Button>
    </PaginationWrapper>
  );
}

Pagination.propTypes = {
  callback: PropTypes.objectOf(PropTypes.func).isRequired,
};

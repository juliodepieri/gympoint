import React, { useState, useEffect, useMemo, useRef, Suspense } from 'react';
import PropTypes from 'prop-types';

import { MdNavigateBefore, MdNavigateNext } from 'react-icons/md';

import { PaginationWrapper, Button } from './styles';

function range(start, stop, step) {
  return Array.from(
    { length: (stop - start) / step + 1 },
    (_, i) => start + i * step
  );
}

export default function Pagination({
  onChange,
  pageRangeDisplayed,
  totalPages,
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const hasMount = useRef(false);

  const pagesDisplayed = useMemo(() => {
    if (pageRangeDisplayed > totalPages) return range(1, totalPages);

    const middlePoint = Math.ceil(pageRangeDisplayed / 2);
    const isRangeOdd = pageRangeDisplayed % 2 !== 0;

    if (currentPage <= middlePoint) {
      return range(1, pageRangeDisplayed, 1);
    }

    const isTheLastPage = currentPage === totalPages;
    const isTheSecondToLastPage = currentPage + 1 >= totalPages;

    if (isTheLastPage || isTheSecondToLastPage) {
      return range(totalPages - (pageRangeDisplayed - 1), totalPages, 1);
    }

    const left = isRangeOdd ? middlePoint - 1 : middlePoint;
    const right = isRangeOdd ? middlePoint - 1 : middlePoint - 1;
    return range(
      currentPage - left,
      totalPages >= currentPage + right ? currentPage + right : totalPages,
      1
    );
  }, [currentPage, pageRangeDisplayed, totalPages]);

  useEffect(() => {
    if (hasMount.current) {
      onChange(currentPage);
    } else {
      hasMount.current = true;
    }
  }, [currentPage, onChange]);

  function handleNextPage() {
    setCurrentPage(prev => prev + 1);
  }

  function handlePreviousPage() {
    setCurrentPage(prev => prev - 1);
  }

  function selectPage(page) {
    if (page !== currentPage) {
      setCurrentPage(page);
      onChange(page);
    }
  }

  return (
    <PaginationWrapper>
      <Button
        type="button"
        title="Página anterior"
        onClick={() => handlePreviousPage()}
        disabled={currentPage === 1}
      >
        <MdNavigateBefore />
      </Button>

      {pagesDisplayed.map(p => (
        <Button
          key={String(p)}
          type="button"
          onClick={() => selectPage(p)}
          active={p === currentPage}
        >
          {p}
        </Button>
      ))}

      <Button
        type="button"
        title="Próxima página"
        onClick={() => handleNextPage()}
        disabled={currentPage === totalPages}
      >
        <MdNavigateNext />
      </Button>
    </PaginationWrapper>
  );
}

Pagination.propTypes = {
  onChange: PropTypes.func.isRequired,
  pageRangeDisplayed: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
};

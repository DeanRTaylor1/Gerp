import React, { useRef, useEffect } from 'react';

interface TableProps {
  children: React.ReactNode;
}

const Table: React.FC<TableProps> = ({ children }) => {
  const tableRef = useRef<HTMLTableElement>(null);
  const scrollTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (tableRef.current) {
        tableRef.current.classList.add('overflow-x-auto');
        if (scrollTimeoutRef.current !== null) {
          clearTimeout(scrollTimeoutRef.current);
        }
        scrollTimeoutRef.current = window.setTimeout(() => {
          if (tableRef.current) {
            tableRef.current.classList.remove('overflow-x-auto');
          }
        }, 300);
      }
    };

    const tableElement = tableRef.current;
    if (tableElement) {
      tableElement.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (tableElement) {
        tableElement.removeEventListener('scroll', handleScroll);
      }
      if (scrollTimeoutRef.current !== null) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={tableRef}
      className="min-w-full overflow-x-scroll lg:overflow-x-hidden transition-[overflow-x] duration-300"
    >
      <table className="w-full table-auto">{children}</table>
    </div>
  );
};

export default Table;

import { useState } from 'react';
import Image from 'next/image';

import styles from './select.module.css';

export type SelectOption = {
  id: string;
  value: string;
  label: string;
  info?: string;
  logo?: string;
};

export type SelectValue =
  | string
  | {
      label: string;
      logo?: string;
      info?: string;
    };

type Props = {
  value: SelectValue;
  onValueChange: (value: string) => void;
  options: SelectOption[];
  valueColour?: string;
  optionInfoColour?: string;
};

export default function Select({
  value,
  onValueChange,
  options,
  valueColour = '#B0B5C3',
  optionInfoColour = '#B0B5C3',
}: Props) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  function onSelectOption(option: SelectOption) {
    onValueChange(option.value);
    setIsOpen(false);
  }

  function renderSelectLabel() {
    if (!value) {
      return '';
    }

    if (typeof value === 'string') {
      return value;
    }

    return (
      <>
        {value.logo && (
          <Image
            loader={() => value.logo!}
            src={value.logo}
            alt={`${value.label} logo`}
            height={24}
            width={24}
            unoptimized
          />
        )}
        {value.label}
        {value.info && (
          <span style={{ color: optionInfoColour }}>{value.info}</span>
        )}
      </>
    );
  }

  return (
    <div className={styles['container']}>
      <button
        style={{ color: valueColour }}
        className={styles['select-button']}
        onClick={() => setIsOpen(!isOpen)}
      >
        {renderSelectLabel()}
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={1.5}
          stroke='#B0B5C3'
          className='size-4 ml-auto'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='m19.5 8.25-7.5 7.5-7.5-7.5'
          />
        </svg>
      </button>
      {isOpen && (
        <div className={styles['select-dropdown']}>
          {options.map((option) => (
            <div key={option.id} onClick={() => onSelectOption(option)}>
              <span className={styles['select-option']}>
                {option.logo && (
                  <Image
                    loader={() => option.logo!}
                    src={option.logo}
                    alt={`${option.label} logo`}
                    height={24}
                    width={24}
                    unoptimized
                  />
                )}
                {option.label}{' '}
                <span style={{ color: optionInfoColour }}>{option.info}</span>
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

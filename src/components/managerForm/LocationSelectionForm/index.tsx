import React, { ChangeEvent, useState } from 'react';
import Image from 'next/image';
import { citiesData } from '@/constants/locationData';

import { BsChevronUp, BsChevronDown } from 'react-icons/bs';
import * as G from '../style';
import * as S from './style';

function LocationSelectionForm({ register }: { register: any }) {
  const [isOptionsOpen, setIsOptionsOpen] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState('');
  const [selectedCities, setSelectedCities] = useState([]);

  const regionChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setSelectedRegion(e.target.value);
  };

  const cityChangeHandler = (e) => {
    const city = e.target.value;

    setSelectedCities((prevSelectedCities) => {
      if (prevSelectedCities.includes(city)) {
        return prevSelectedCities.filter((selectedCity) => selectedCity !== city);
      } else {
        return [...prevSelectedCities, city];
      }
    });
  };

  const filterLocationHandler = (city) => {
    const newSelectedCities = selectedCities.filter((selectedCity) => selectedCity !== city);
    setSelectedCities(newSelectedCities);
  };

  return (
    <S.LocationSelectionForm>
      <G.SubTitle>어디서 활동 가능 하신가요?</G.SubTitle>
      <p>활동이 가능하신 모든 지역을 등록해주세요.</p>

      {/* 지역 태그 */}
      {selectedRegion && selectedCities.length > 0 && (
        <S.SelectedLocation>
          {selectedCities.map((city) => {
            let regionName = selectedRegion;
            if (regionName === 'seoul') regionName = '서울';
            else if (regionName === 'gyeonggi') regionName = '경기';

            return (
              <div key={city}>
                {regionName} {city}
                <button type="button" onClick={() => filterLocationHandler(city)}>
                  <Image src="/icons/tag-close-icon.svg" alt="tag-close-icon" width={10.5} height={10.5} />
                </button>
              </div>
            );
          })}
        </S.SelectedLocation>
      )}

      <div style={{ position: 'relative' }}>
        {/* Select Button */}
        <S.SelectButton
          type="button"
          region={selectedRegion}
          isOptionsOpen={isOptionsOpen}
          onClick={() => setIsOptionsOpen(!isOptionsOpen)}
        >
          <div className="select-region">
            지역 선택
            {isOptionsOpen ? <BsChevronUp /> : <BsChevronDown />}
          </div>

          <div className="select-detail">
            <span>{selectedRegion === 'seoul' ? '서울특별시' : '경기도'}</span>

            <span>
              세부 선택
              <BsChevronUp />
            </span>
          </div>
        </S.SelectButton>

        {/* Options */}
        {isOptionsOpen && (
          <S.ListWrapper>
            <ul>
              <li>
                <input
                  type="radio"
                  name="manager_available_region"
                  id="seoul"
                  value="seoul"
                  {...register('manager_available_region')}
                  onChange={regionChangeHandler}
                />
                <label htmlFor="seoul">서울특별시</label>
              </li>

              <li>
                <input
                  type="radio"
                  name="manager_available_region"
                  id="gyeonggi"
                  value="gyeonggi"
                  {...register('manager_available_region')}
                  onChange={regionChangeHandler}
                />
                <label htmlFor="gyeonggi">경기도</label>
              </li>
            </ul>

            {selectedRegion && (
              <ul>
                {citiesData[selectedRegion].map((district: string) => (
                  <li key={district}>
                    <input
                      type="checkbox"
                      name="manager_available_district"
                      id={district}
                      value={district}
                      {...register('manager_available_district')}
                      onChange={cityChangeHandler}
                    />
                    <label htmlFor={district}>{district}</label>
                  </li>
                ))}
              </ul>
            )}
          </S.ListWrapper>
        )}
      </div>
    </S.LocationSelectionForm>
  );
}

export default LocationSelectionForm;

import { PatchEvent, set, unset } from "part:@sanity/form-builder/patch-event";
import client from "part:@sanity/base/client";
import FormField from "part:@sanity/components/formfields/default";
import React, { useState, useEffect } from "react";
import SearchableSelect from "part:@sanity/components/selects/searchable";

export const FileSearchableSelect = React.forwardRef(
  (
    { onFocus, onBlur, onChange, type, value, level, markers, readOnly },
    ref
  ) => {
    const [inputValue, setInputValue] = useState(null);
    const [isFetching, setIsFetching] = useState(false);
    const [hits, setHits] = useState([]);
    const [files, setFiles] = useState([]);

    useEffect(() => {
      setIsFetching(true);
      client
        .fetch(
          '*[_type == "s3-dam.storedFile"]'
        )
        .then((results) => {
          setIsFetching(false);
          setFiles(results);
        });
    }, []);

    function handleChange({ props }) {     
      const { title, videoId } = props;
      onChange(PatchEvent.from(set(videoId)));
      setInputValue(null);
    }

    function handleOpen() {
      search("");
    }

    function handleBlur() {
      onBlur();
    }

    function handleFocus() {
      onFocus();
    }

    function handleSearch(query) {
      search(query);
    }

    function handleClear() {
      onChange(PatchEvent.from(unset()));
    }

    function formatBytes(bytes, decimals = 2) {
      if (!+bytes) return '0 Bytes'
  
      const k = 1024
      const dm = decimals < 0 ? 0 : decimals
      const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
  
      const i = Math.floor(Math.log(bytes) / Math.log(k))
  
      return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`
  }

  function getVideoTitle(videoId){
    return files.find(file => file._id === videoId)?.title
  }

    function search(query) {
      setInputValue(query);
      setHits(
        files
          .filter(
            ({ title }) =>
              title.toLowerCase().indexOf(query.toLowerCase()) > -1
          )
          .map(({ fileSize, title, _id }) => (
            <div
              style={{ display: "flex" }}
              videoId={_id}
            >
              <div>{title}</div>
              <div
                style={{
                  fontSize: 11,
                  opacity: 0.75,
                  marginLeft: "auto",
                  flexShrink: 0,
                  whiteSpace: "nowrap",
                }}
              >
                {formatBytes(fileSize)}
              </div>
            </div>
          ))
      );
    }

    function renderItem(originalFilename) {
      return originalFilename;
    }

    return (
      <FormField
        markers={markers}
        label={type.title}
        level={level}
        description={type.description}
      >
        <SearchableSelect
          placeholder="Type to search…"
          title={inputValue}
          onOpen={handleOpen}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onSearch={handleSearch}
          onChange={handleChange}
          onClear={handleClear}
          value={value}
          inputValue={inputValue === null ? value?.name : inputValue}
          renderItem={renderItem}
          isLoading={isFetching}
          items={hits}
          ref={ref}
          readOnly={readOnly}
        />
        {value && (
          <p>{getVideoTitle(value)}</p>
        )}
      </FormField>
    );
  }
);
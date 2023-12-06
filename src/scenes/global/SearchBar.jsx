import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import { useDispatch, useSelector } from "react-redux";
import { Box, InputAdornment } from "@mui/material";
import { SearchOutlined } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { item, search } from "../../Model/menu";
import { setMenuClosed } from "../../state/menu";

const filterOptions = createFilterOptions({
  matchFrom: "any",
  stringify: (option) => `${option.label} ${option.tags}`,
  trim: false,
});

const SearchBar = () => {
  const [selectedValue, setSelectedValue] = useState(null);
  const items = useSelector((state) => state.cart.items);
  const isMenuOpen = useSelector((state) => state.cart.isMenuOpen);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const options = items.map((item) => ({
    label: item.attributes.name,
    id: item.id,
    tags: item.attributes.shortDescription,
  }));

  const handleSubmit = (data) => {
    dispatch(setMenuClosed());
    if (typeof data === "string" && data.trim() != "") {
      navigate(`${search.link()}/${data}`);
    }
    if (data?.label) {
      navigate(`${item.link()}/${data.id}`);
    }
  };

  return (
    options?.length > 0 && (
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit(selectedValue);
        }}
      >
        <Box display="flex">
          <Autocomplete
            freeSolo
            id="search-box"
            sx={{
              width: 300,
            }}
            options={options}
            selectOnFocus
            disableClearable
            clearOnBlur
            isOptionEqualToValue={(option, value) =>
              option.label === value.label
            }
            onChange={(event, selectedOption) => {
              setSelectedValue(selectedOption);
              if (isMenuOpen) dispatch(setMenuClosed());
              // Submit the form when an option is selected
              handleSubmit(selectedOption);
            }}
            filterOptions={filterOptions}
            renderOption={(props, option) => (
              <Box component="li" aria-label={option.label} {...props}>
                {option.label}
              </Box>
            )}
            renderInput={(params) => (
              <TextField
                {...params}
                size="small"
                aria-label="search"
                placeholder="Search"
                value={selectedValue ? selectedValue.label : ""}
                onChange={(event) =>
                  setSelectedValue({ label: event.target.value })
                }
                InputProps={{
                  ...params.InputProps,
                  size: "small",
                  type: "string",
                  startAdornment: (
                    <InputAdornment position="start" sx={{ mr: 0 }}>
                      <SearchOutlined />
                    </InputAdornment>
                  ),
                }}
              />
            )}
          />
        </Box>
      </form>
    )
  );
};

export default SearchBar;

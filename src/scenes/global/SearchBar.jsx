import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import { useSelector } from "react-redux";
import { Box, IconButton, InputAdornment } from "@mui/material";
import { SearchOutlined } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { item, search } from "../../Model/menu";

const filterOptions = createFilterOptions({
  matchFrom: "any",
  stringify: (option) => `${option.label} ${option.tags}`,
  trim: false,
});

const SearchBar = () => {
  const [selectedValue, setSelectedValue] = useState(null);
  const items = useSelector((state) => state.cart.items);
  const navigate = useNavigate();

  const options = items.map((item) => ({
    label: item.attributes.name,
    id: item.id,
    tags: item.attributes.shortDescription,
  }));

  const handleSubmit = (data) => {
    if (typeof data === "string" && data.trim() != "") {
      navigate(`${search.link()}/${data}`);
    }
    if (data?.label) {
      navigate(`${item.link()}/${data.id}`);
    }
    // Add logic to handle the submission of the form data
  };

  return (
    options?.length > 0 && (
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit(selectedValue);
        }}
      >
        <Box display="flex" id="hey">
          <Autocomplete
            freeSolo
            id="search-box"
            sx={{
              width: 300,
            }}
            options={options}
            selectOnFocus
            getOptionSelected={(option, value) => option.label === value.label}
            onChange={(event, selectedOption) => {
              setSelectedValue(selectedOption);
              // Submit the form when an option is selected
              handleSubmit(selectedOption);
            }}
            filterOptions={filterOptions}
            renderOption={(props, option) => (
              <Box component="li" {...props}>
                {option.label}
              </Box>
            )}
            renderInput={(params) => (
              <TextField
                size="small"
                {...params}
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
                      <IconButton
                        type="submit"
                        color="primary"
                        aria-label="search"
                        sx={{ color: "black" }}
                      >
                        <SearchOutlined />
                      </IconButton>
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

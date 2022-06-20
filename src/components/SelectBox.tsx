import { useEffect, useState } from "react"
import Select from "react-select"

const SelectBox = (props: any) => {
  const {
    data = [],
    optionValue = "value",
    optionText = "text",
    displayValueInLabel = false,
    isClearable = true,
    closeMenuOnSelect = true,
    name,
    value,
    placeholder,
    onChange,
    ...attributes
  } = props
  const [selectedOptions, setSelectedOptions] = useState([value])
  const [options, setOptions] = useState([])

  const handleChange = (selected: any) => {
    onChange({ target: { name: name, value: selected?.value } })
    setSelectedOptions(selected)
  }

  useEffect(() => {
    if (data) {
      setOptions(
        data.map((item: any) => ({
          value: item[optionValue],
          label: displayValueInLabel
            ? `(${item[optionValue]}) ${item[optionText]}`
            : item[optionText]
        }))
      )
    }
  }, [data, optionValue, optionText, displayValueInLabel])

  return (
    <Select
      {...attributes}
      options={options}
      isLoading={!options}
      closeMenuOnSelect={closeMenuOnSelect}
      isClearable={isClearable}
      onChange={handleChange}
      value={selectedOptions}
      name={name}
      placeholder={placeholder}
      noOptionsMessage={() => "Sem opções"}
    />
  )
}

export default SelectBox

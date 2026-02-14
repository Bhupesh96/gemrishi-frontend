"use client"

import type React from "react"
import { useState } from "react"
import { XMarkIcon, ChevronDownIcon } from "@heroicons/react/24/outline"

interface FilterModalProps {
  isOpen: boolean
  onClose: () => void
  onApplyFilters: (filters: any) => void
}

const FilterModal: React.FC<FilterModalProps> = ({ isOpen, onClose, onApplyFilters }) => {
  const [filters, setFilters] = useState({
    price: "",
    productType: "",
    weight: "",
    cutType: "",
    origin: "",
    colour: "",
    dimension: "",
    pricePerCarat: "",
    ratti: "",
    certification: "",
  })

  const [openDropdowns, setOpenDropdowns] = useState<{ [key: string]: boolean }>({})

  const filterOptions = {
    price: ["Under ₹10,000", "₹10,000 - ₹25,000", "₹25,000 - ₹50,000", "₹50,000 - ₹1,00,000", "Above ₹1,00,000"],
    productType: ["Natural Stone", "Certified Stone", "Premium Stone", "Rare Stone"],
    weight: ["Under 1 Carat", "1-2 Carats", "2-3 Carats", "3-5 Carats", "Above 5 Carats"],
    cutType: ["Round", "Oval", "Cushion", "Emerald", "Princess", "Pear"],
    origin: ["Sri Lanka (Ceylon)", "Kashmir", "Burma (Myanmar)", "Thailand", "Madagascar"],
    colour: ["Blue", "Pink", "Yellow", "White", "Green", "Red"],
    dimension: ["Small (5-7mm)", "Medium (7-9mm)", "Large (9-12mm)", "Extra Large (12mm+)"],
    pricePerCarat: ["Under ₹1,000", "₹1,000-₹5,000", "₹5,000-₹10,000", "Above ₹10,000"],
    ratti: ["Under 1 Ratti", "1-2 Ratti", "2-3 Ratti", "3-5 Ratti", "Above 5 Ratti"],
    certification: ["GIA", "Gübelin", "SSEF", "AGL", "Lotus Gemology", "No Certification"],
  }

  const toggleDropdown = (filterName: string) => {
    setOpenDropdowns((prev) => ({
      ...prev,
      [filterName]: !prev[filterName],
    }))
  }

  const handleFilterSelect = (filterName: string, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [filterName]: value,
    }))
    setOpenDropdowns((prev) => ({
      ...prev,
      [filterName]: false,
    }))
  }

  const handleApplyFilters = () => {
    onApplyFilters(filters)
    onClose()
  }

  const handleReset = () => {
    setFilters({
      price: "",
      productType: "",
      weight: "",
      cutType: "",
      origin: "",
      colour: "",
      dimension: "",
      pricePerCarat: "",
      ratti: "",
      certification: "",
    })
  }

  if (!isOpen) return null

  const FilterDropdown = ({
    label,
    filterKey,
    options,
  }: {
    label: string
    filterKey: string
    options: string[]
  }) => (
    <div className="relative mb-4">
      <button
        onClick={() => toggleDropdown(filterKey)}
        className="w-full h-12 px-4 bg-gray-50 border border-gray-200 rounded-lg flex items-center justify-between text-left text-gray-700 hover:bg-gray-100 transition-colors"
      >
        <span className="text-sm font-medium">{filters[filterKey as keyof typeof filters] || label}</span>
        <ChevronDownIcon
          className={`w-5 h-5 text-gray-500 transition-transform ${openDropdowns[filterKey] ? "rotate-180" : ""}`}
        />
      </button>

      {openDropdowns[filterKey] && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-48 overflow-y-auto">
          {options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleFilterSelect(filterKey, option)}
              className="w-full px-4 py-3 text-left text-sm text-gray-700 hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0"
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  )

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden border-4 border-blue-400">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800">Filters</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <XMarkIcon className="w-6 h-6 text-gray-600" />
          </button>
        </div>

        {/* Filter Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left Column */}
            <div className="space-y-4">
              <FilterDropdown label="Price" filterKey="price" options={filterOptions.price} />
              <FilterDropdown label="Weight" filterKey="weight" options={filterOptions.weight} />
              <FilterDropdown label="Origin" filterKey="origin" options={filterOptions.origin} />
              <FilterDropdown label="Dimension" filterKey="dimension" options={filterOptions.dimension} />
              <FilterDropdown label="Ratti" filterKey="ratti" options={filterOptions.ratti} />
            </div>

            {/* Right Column */}
            <div className="space-y-4">
              <FilterDropdown label="Product Type" filterKey="productType" options={filterOptions.productType} />
              <FilterDropdown label="Cut Type" filterKey="cutType" options={filterOptions.cutType} />
              <FilterDropdown label="Colour" filterKey="colour" options={filterOptions.colour} />
              <FilterDropdown label="Price per carat" filterKey="pricePerCarat" options={filterOptions.pricePerCarat} />
              <FilterDropdown label="Certification" filterKey="certification" options={filterOptions.certification} />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200 flex flex-col sm:flex-row gap-3 justify-between">
          <button
            onClick={handleReset}
            className="px-6 py-3 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium"
          >
            Reset Filters
          </button>
          <button
            onClick={handleApplyFilters}
            className="px-8 py-3 bg-teal-700 text-white rounded-lg hover:bg-teal-800 transition-colors font-medium"
          >
            Apply Filter
          </button>
        </div>
      </div>
    </div>
  )
}

export default FilterModal

import {Select} from 'antd'
import React from 'react'
import SCEntrySelect from '~/components/EntrySelect/SC.EntrySelect'

const {Option} = Select

export default function EntrySelect({
  defaultValue,
  entryOptions,
  onChange
}){
  return (
    <SCEntrySelect className='EntrySelect'>
      <span>Show</span>
      <Select
        defaultValue={defaultValue}
        style={{width: 57}}
        onChange={onChange}
      >
        {entryOptions.map((entry, index) => (
          <Option key={index} value={entry}>{entry}</Option>
        ))}
      </Select>
      <span>entries</span>
    </SCEntrySelect>
  )
}
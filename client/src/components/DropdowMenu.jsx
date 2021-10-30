
export default function DropdowMenu({toggleDropdown, handleChange, noOptionsMsg, queriedOptions, value, name}) {
  return (
    <ul className={`form-options ${toggleDropdown ? 'open' : 'close'}`}>
      {queriedOptions.length ?
        queriedOptions.map((option) => (
          <li key={option.id}>
            <input
              id={option.id}
              className="option"
              type="radio"
              value={option[value]}
              name={`${name}`}
              onChange={(e) => handleChange(e)}
            />
            <label htmlFor={option.id}>{option[value]}</label>
          </li>
        ))
        :
        <li>
          <p>{noOptionsMsg}</p>
        </li>
      }
    </ul>
  )
}
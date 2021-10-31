
export default function DropdowMenu({toggleDropdown, handleChange, noOptionsMsg, queriedOptions, value, name}) {
  return (
    <ul className={`form-options ${toggleDropdown[0] ? 'open' : 'close'}`}>
      {queriedOptions.length ?
        queriedOptions.map((option) => (
          <li key={option.id}>
            <input
              id={`${option[value]}-${name}`}
              data-port-id={option.id}
              className="option"
              type="radio"
              value={option[value]}
              name={name}
              onChange={(e) => handleChange(e, toggleDropdown[1])}
            />
            <label htmlFor={`${option[value]}-${name}`}>{option[value]}</label>
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

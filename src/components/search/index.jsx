import React, { useState } from "react";
import { NavItem, NavLink } from "reactstrap";
import { Icon } from "@iconify/react";
import AutoComplete from "../autocomplete";

const NavbarSearch = () => {
  const [navbarSearch, setNavbarSearch] = useState(false);

  const handleExternalClick = () => {
    if (navbarSearch === true) {
      setNavbarSearch(false)
    }
  }

   // ** Function to clear input value
   const handleClearInput = setUserInput => {
    if (!navbarSearch) {
      setUserInput('')
      //handleClearQueryInStore()
    }
  }

  const onKeyDown = e => {
    if (e.keyCode === 27 || e.keyCode === 13) {
      setTimeout(() => {
        //setNavbarSearch(false)
        // handleClearQueryInStore()
        if (e.keyCode === 13) {
          window.location = `/search?q=${e.target.value}`
        }
        setNavbarSearch(false)
      }, 1)
    }
  }


  return (
    <NavItem className="nav-search">
      <NavLink className="nav-link-search">
        <Icon
          icon="uil:search"
          width="22"
          height="22"
          onClick={() => setNavbarSearch(true)}
          className="ficon mt-2"
        />
      </NavLink>
      <div>
        <div className={`search-input-icon ${navbarSearch ? 'search_active' : ''}`}>
          {navbarSearch ? <AutoComplete 
          setNavbarSearch={setNavbarSearch} 
          suggestions={[]}
          placeholder="Type Ahead..."
          filterKey='title'
          filterHeaderKey='groupTitle'
          grouped={true} 
          autoFocus={true}
            // onSuggestionItemClick={handleSuggestionItemClick}
            externalClick={handleExternalClick}
            clearInput={(userInput, setUserInput) => handleClearInput(setUserInput)}
            onKeyDown={onKeyDown}
            // onChange={e => dispatch(handleSearchQuery(e.target.value))}
            customRender={(item, i, filteredData, activeSuggestion, onSuggestionItemClick, onSuggestionItemHover) => {
              const IconTag = Icon[item.icon ? item.icon : 'X']
              return (
                <li
                  className={classnames('suggestion-item', {
                    active: filteredData.indexOf(item) === activeSuggestion
                  })}
                  key={i}
                  onClick={e => handleListItemClick(onSuggestionItemClick, item.link, e)}
                  onMouseEnter={() => onSuggestionItemHover(filteredData.indexOf(item))}
                >
                  <div
                    className={classnames({
                      'd-flex justify-content-between align-items-center': item.file || item.img
                    })}
                  >
                    <div className='item-container d-flex'>
                      {item.icon ? (
                        <IconTag size={17} />
                      ) : item.file ? (
                        <img src={item.file} height='36' width='28' alt={item.title} />
                      ) : item.img ? (
                        <img className='rounded-circle mt-25' src={item.img} height='28' width='28' alt={item.title} />
                      ) : null}
                      <div className='item-info ms-1'>
                        <p className='align-middle mb-0'>{item.title}</p>
                        {item.by || item.email ? (
                          <small className='text-muted'>{item.by ? item.by : item.email ? item.email : null}</small>
                        ) : null}
                      </div>
                    </div>
                    {item.size || item.date ? (
                      <div className='meta-container'>
                        <small className='text-muted'>{item.size ? item.size : item.date ? item.date : null}</small>
                      </div>
                    ) : null}
                  </div>
                </li>
              )
            }}
          /> : null}
        </div>
      </div>
    </NavItem>
  );
};

export default NavbarSearch;

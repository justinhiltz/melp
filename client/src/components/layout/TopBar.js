import React from "react";
import { Link } from "react-router-dom";
import SignOutButton from "../authentication/SignOutButton";

const TopBar = ({ user }) => {
  const unauthenticatedListItems = [
    <li key="sign-in">
      <Link to="/user-sessions/new">Sign In</Link>
    </li>,
    <li key="sign-up">
      <Link to="/users/new" className="button radius">
        Sign Up
      </Link>
    </li>,
  ];

  const authenticatedListItems = [
    <li key="add-meme">
      <Link to="/memes/new">Add New Meme</Link>
    </li>,
    <li key="sign-out">
      <SignOutButton />
    </li>,
  ];

  const unauthenticatedListItemsMobile = [
    <li key="sign-in">
      <Link to="/user-sessions/new">Sign In</Link>
    </li>,
    <li key="sign-up">
      <Link to="/users/new">Sign Up</Link>
    </li>,
  ];

  const authenticatedListItemsMobile = [
    <li key="add-meme">
      <Link to="/memes/new">Add New Meme</Link>
    </li>,
    <li key="sign-out">
      <SignOutButton />
    </li>,
  ];

  return (
    <>
      <div className="top-bar">
        <div className="top-bar-left">
          <ul className="vertical menu show-for-small-only">
            <li>
              <Link to="/" className="melp-logo">
                Melp!
              </Link>
            </li>
          </ul>
          <ul className="menu vertical show-for-small-only">
            {user ? authenticatedListItemsMobile : unauthenticatedListItemsMobile}
          </ul>
          <ul className="menu show-for-medium">
            <li>
              <Link to="/" className="melp-logo">
                Melp!
              </Link>
            </li>
          </ul>
        </div>
        <div className="top-bar-right show-for-medium">
          <ul className="menu">{user ? authenticatedListItems : unauthenticatedListItems}</ul>
        </div>
      </div>
    </>
  );
};

export default TopBar;

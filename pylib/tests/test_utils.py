# Copyright: Ankitects Pty Ltd and contributors
# License: GNU AGPL, version 3 or later; http://www.gnu.org/licenses/agpl.html

from unittest.mock import patch

from anki.utils import int_version_to_str, invalid_filename


def test_int_version_to_str():
    assert int_version_to_str(23) == "2.1.23"
    assert int_version_to_str(230900) == "23.09"
    assert int_version_to_str(230901) == "23.09.1"


def test_invalid_filename_CD1():
    with patch("anki.utils.is_win", False):
        file_name = "/file_name"
        assert invalid_filename(file_name) == "/"


def test_invalid_filename_CD2():
    with patch("anki.utils.is_win", True):
        file_name = "/filename"
        assert invalid_filename(file_name, False) == "/"


def test_invalid_filename_CD3():
    with patch("anki.utils.is_win", False):
        file_name = "fileName"
        assert invalid_filename(file_name) == None


def test_invalid_filename_CD4():
    with patch("anki.utils.is_win", False):
        file_name = "/filename"
        assert invalid_filename(file_name, False) == None


def test_invalid_filename_CD5():
    with patch("anki.utils.is_win", True):
        file_name = "\\fileName"
        assert invalid_filename(file_name) == "\\"


def test_invalid_filename_CD6():
    with patch("anki.utils.is_win", True):
        file_name = "fileName"
        assert invalid_filename(file_name) == None


def test_invalid_filename_CD7():
    with patch("anki.utils.is_win", True):
        file_name = "\\fileName"
        assert invalid_filename(file_name, False) == None


def test_invalid_filename_CD8():
    with patch("anki.utils.is_win", False):
        file_name = "\\filename"
        assert invalid_filename(file_name, False) == "\\"


def test_invalid_filename_CD9():
    with patch("anki.utils.is_win", True):
        file_name = "fileName?"
        assert invalid_filename(file_name, False) == "?"


def test_invalid_filename_CD10():
    with patch("anki.utils.is_win", True):
        file_name = " .aFile"
        assert invalid_filename(file_name, False) == "."

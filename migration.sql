CREATE FUNCTION public.nanoid (size integer DEFAULT 12)
	RETURNS text
	LANGUAGE plpgsql
	STABLE
	AS $$
DECLARE
	id text := '';
	idx int := 0;
	alphabet char(62) := '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
	bytes bytea := gen_random_bytes(size);
	byte int;
	pos int;
BEGIN
	WHILE idx < size LOOP
		byte := get_byte(bytes, idx);
		pos := (byte & 61) + 1;
		-- + 1 because substr starts at 1 for some reason
		id := id || substr(alphabet, pos, 1);
		idx = idx + 1;
	END LOOP;
	RETURN id;
END
$$;

CREATE TABLE public.accounts (
	id character varying (255) DEFAULT public.nanoid () NOT NULL,
	TYPE character varying (255) NOT NULL,
	provider character varying (255) NOT NULL,
	provider_account_id character varying (255) NOT NULL,
	refresh_token character varying (255),
	access_token character varying (255),
	expires_at bigint,
	token_type character varying (255),
	scope character varying (255),
	id_token character varying (255),
	session_state character varying (255),
	oauth_token_secret character varying (255),
	oauth_token character varying (255),
	user_id character varying (255) NOT NULL
);

CREATE TABLE public.sessions (
	id character varying (255) DEFAULT public.nanoid () NOT NULL,
	session_token character varying (255) NOT NULL,
	user_id character varying (255) NOT NULL,
	expires bigint NOT NULL
);

CREATE TABLE public.users (
	id character varying (255) DEFAULT public.nanoid () NOT NULL,
	name character varying (255),
	email character varying (255),
	image character varying (255),
	email_verified bigint
);

CREATE TABLE public.verification_tokens (
	id character varying (255) DEFAULT public.nanoid () NOT NULL,
	token character varying (255) NOT NULL,
	identifier character varying (255) NOT NULL,
	expires bigint NOT NULL
);

ALTER TABLE ONLY public.accounts
	ADD CONSTRAINT accounts_pkey PRIMARY KEY (id);

ALTER TABLE ONLY public.sessions
	ADD CONSTRAINT sessions_pkey PRIMARY KEY (id);

ALTER TABLE ONLY public.sessions
	ADD CONSTRAINT sessions_session_token_key UNIQUE (session_token);

ALTER TABLE ONLY public.users
	ADD CONSTRAINT users_email_key UNIQUE (email);

ALTER TABLE ONLY public.users
	ADD CONSTRAINT users_pkey PRIMARY KEY (id);

ALTER TABLE ONLY public.verification_tokens
	ADD CONSTRAINT verification_tokens_pkey PRIMARY KEY (id);

ALTER TABLE ONLY public.accounts
	ADD CONSTRAINT accounts_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users (id) ON
	UPDATE
		RESTRICT ON DELETE RESTRICT;

ALTER TABLE ONLY public.sessions
	ADD CONSTRAINT sessions_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users (id) ON
	UPDATE
		RESTRICT ON DELETE RESTRICT;
